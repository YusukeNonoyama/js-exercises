const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// チャンネルの初期化
const todoChannel = new BroadcastChannel('todo-channel');

// ToDoを格納するリスト (IndexedDBから読み込み/操作時に使用)
let todoList = [];

// IndexedDB関連の定数
const DB_NAME = "todoDB";
const STORE_NAME = "todos";
const DB_VERSION = 1;

// https://press.monaca.io/atsushi/24689

/**
 * データベースを開き、初期設定を行う
 * @returns {Promise<IDBDatabase>} IndexedDBのインスタンス
 */
function openDB() {
  return new Promise((resolve, reject) => {
    // データベースを開くリクエスト
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // 成功時
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    // 失敗時
    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.errorCode);
      reject("Database error");
    };

    // バージョンアップグレードが必要な場合 (初回作成時など)
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // オブジェクトストアがまだ存在しない場合のみ作成
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // オブジェクトストアを作成
        // keyPath: プライマリキーとして使用するプロパティ (ここでは 'id')
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        // 'status'でインデックスを作成しておくと検索に使えるが、今回は必須ではない
        objectStore.createIndex("status", "status", { unique: false });
      }
    };
  });
}

/**
 * すべてのToDoアイテムをIndexedDBから読み込み、画面に表示する
 */
async function loadTodos() {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onsuccess = (event) => {
      // データベースから読み込んだアイテムでtodoListを更新
      todoList = event.target.result;
      // id順にソート（autoIncrementでも保証されない場合があるため）
      todoList.sort((a, b) => a.id - b.id);

      // 画面をクリアしてからアイテムを描画
      list.innerHTML = "";
      for (const item of todoList) {
        appendToDoItem(item);
      }
    };

    request.onerror = (event) => {
      console.error("Error reading todos:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Failed to open DB:", error);
  }
}

/**
 * IndexedDBに新しいToDoアイテムを追加する
 * @param {string} name ToDoの名前
 */
async function addTodo(name) {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // 追加するアイテムのオブジェクト (idはautoIncrementで自動設定される)
    const newItem = {
      name: name,
      status: "active", // 初期ステータスはactive
      // id: currentId, // autoIncrementを使用するため不要
    };

    const request = store.add(newItem);

    request.onsuccess = (event) => {
      // IndexedDBが自動で割り当てたIDを取得
      const newId = event.target.result;
      const addedItem = { ...newItem, id: newId };

      // todoList配列にも追加
      todoList.push(addedItem);

      // 画面にアイテムを追加
      appendToDoItem(addedItem);

      // ✨ 他のタブに変更を通知
      todoChannel.postMessage('update');
    };

    request.onerror = (event) => {
      console.error("Error adding todo:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Failed to open DB:", error);
  }
}

/**
 * IndexedDBのToDoアイテムのステータスを更新する
 * @param {number} id 更新するアイテムのID
 * @param {'active' | 'completed'} newStatus 新しいステータス
 */
async function updateTodoStatus(id, newStatus) {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // まず既存のデータを取得
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const item = event.target.result;
      if (item) {
        // ステータスを更新
        item.status = newStatus;

        // IndexedDBに更新したデータを書き戻す
        const updateRequest = store.put(item);

        // ✨ 他のタブに変更を通知
        todoChannel.postMessage('update');

        updateRequest.onsuccess = () => {
          // todoList配列のアイテムも更新
          const todoIndex = todoList.findIndex(o => o.id === id);
          if (todoIndex !== -1) {
            todoList[todoIndex].status = newStatus;
          }
        };

        updateRequest.onerror = (event) => {
          console.error("Error updating todo:", event.target.errorCode);
        };
      }
    };

    getRequest.onerror = (event) => {
      console.error("Error getting todo for update:", event.target.errorCode);
    };

  } catch (error) {
    console.error("Failed to open DB:", error);
  }
}

/**
 * IndexedDBからToDoアイテムを削除する
 * @param {number} id 削除するアイテムのID
 * @param {HTMLElement} elem 削除するDOM要素
 */
async function deleteTodo(id, elem) {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      // todoList配列から削除
      const index = todoList.findIndex(o => o.id === id);
      if (index !== -1) {
        todoList.splice(index, 1);
      }

      // DOM要素を削除
      elem.remove();

      // ✨ 他のタブに変更を通知
      todoChannel.postMessage('update');
    };

    request.onerror = (event) => {
      console.error("Error deleting todo:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Failed to open DB:", error);
  }
}

/**
 * ToDoアイテムのDOM要素を作成し、リストに追加する
 * @param {Object} item - ToDoアイテムのデータ
 * @param {number} item.id - アイテムのID
 * @param {string} item.name - アイテムの名前
 * @param {'active' | 'completed'} item.status - アイテムのステータス
 */
function appendToDoItem(item) {
  const elem = document.createElement("li");
  const label = document.createElement("label");
  const toggle = document.createElement("input");
  const destroy = document.createElement("button");
  const div = document.createElement("div");

  label.textContent = item.name;

  // 初期ステータスに基づく表示設定
  if (item.status === "completed") {
    label.style.textDecorationLine = "line-through";
    toggle.checked = true;
  } else {
    label.style.textDecorationLine = "none";
    toggle.checked = false;
  }

  toggle.type = "checkbox";
  toggle.onchange = function () {
    const newStatus = toggle.checked ? "completed" : "active";

    // 見た目の更新
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

    // IndexedDBの更新
    updateTodoStatus(item.id, newStatus);
  };

  destroy.textContent = "❌";
  destroy.onclick = function () {
    // IndexedDBからの削除とDOM要素の削除
    deleteTodo(item.id, elem);
  };

  div.append(toggle, label, destroy);
  elem.append(div);
  // 新しいアイテムをリストの先頭に追加
  list.prepend(elem);
}

// フォームのイベントリスナー
form.addEventListener("submit", (e) => {
  // ページのリロードを防ぐ
  e.preventDefault();

  const todoName = input.value.trim();

  // 空文字は無視
  if (todoName === "") {
    return;
  }

  // IndexedDBにアイテムを追加
  addTodo(todoName);

  // 入力欄をクリア
  input.value = "";
});

// アプリケーション起動時: IndexedDBからデータを読み込む
// IndexedDBは非同期なので、処理の最初に実行
loadTodos();

// ✨ BroadcastChannelで他のタブからの更新をリッスン
todoChannel.onmessage = (event) => {
  // 'update'メッセージを受け取ったら、データを再読み込み
  if (event.data === 'update') {
    // データが変更された可能性があるので、再読み込みして画面を更新
    console.log("Received update notification from another tab. Reloading todos...");
    loadTodos();
  }
};
