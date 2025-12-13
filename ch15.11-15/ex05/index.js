const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const DB_NAME = "todoDB"
const STORE_NAME = "todos";

// 同一オリジンのチャネルのコンテキスト（変更を別タブに反映するために追加）
const todoChannel = new BroadcastChannel('todo-channel');

// DBを開いてDBインスタンスをcallbackに渡す関数
function withDB(callback) {
  const request = indexedDB.open(DB_NAME, 1);
  request.onerror = console.error;
  request.onsuccess = () => {
    const db = request.result;
    callback(db);
  };
  // DBがなければ新規作成する
  request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore(STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,  // 自動でid設定
    });
    // statusをインデックスに追加する（なくても動作はする）
    store.createIndex("status", "status", { unique: false });
  };
}

// DBを読んでレンダーする
function loadTodos() {
  withDB((db) => {
    const transaction = db.transaction([STORE_NAME]);
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll(); // DB内の全てのアイテムを取得

    request.onerror = console.error;
    request.onsuccess = () => {
      // 取得したアイテムをループしてDOMに追加
      list.innerHTML = "";
      for (const item of request.result) {
        appendItemToDom(item);
      }
    };
  });
}

// アイテムをDOMに追加
function appendItemToDom(item) {
  const elem = document.createElement("li");
  const label = document.createElement("label");
  const toggle = document.createElement("input");
  const destroy = document.createElement("button");
  const div = document.createElement("div");

  label.textContent = item.name;
  toggle.type = "checkbox";
  destroy.textContent = "❌";

  // アイテムの状態をDOMに反映
  if (item.status === "completed") {
    label.style.textDecorationLine = "line-through";
    toggle.checked = true;
  } else {
    label.style.textDecorationLine = "none";
    toggle.checked = false;
  }

  // トグル変更時の挙動を定義
  toggle.addEventListener("click", () => {
    withDB((db) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(item.id);  // 特定のidのアイテムを取得

      request.onerror = console.error;
      request.onsuccess = () => {
        const item = request.result;
        if (!item) return;

        // ステータスを変更
        item.status = toggle.checked ? "completed" : "active";

        const updateRequest = store.put(item);

        updateRequest.onerror = console.error;
        updateRequest.onsuccess = () => {
          todoChannel.postMessage('update');
        };
      };
    });
  })

  // 対象アイテム削除時の挙動を定義
  destroy.addEventListener("click", () => {
    withDB((db) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      // 特定のidのアイテムを削除
      const request = store.delete(item.id);

      request.onerror = console.error;
      request.onsuccess = () => {
        loadTodos();
        todoChannel.postMessage('update');
      };
    });
  });
  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}

// アイテムの追加の挙動を定義
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = input.value.trim();
  if (todoName === "") return;

  const name = todoName;

  withDB((db) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const newItem = {
      name: todoName,
      status: "active",
    };

    const request = store.add(newItem);

    request.onerror = console.error;
    request.onsuccess = (event) => {
      const newId = event.target.result;
      const addedItem = { ...newItem, id: newId };

      appendItemToDom(addedItem);
      todoChannel.postMessage('update');
    };
  });

  input.value = "";
});

// チャネルに更新があったときにトリガーされ、メッセージが"update"の場合にloadTodosする（DBを読んでレンダー）
todoChannel.onmessage = (event) => {
  if (event.data === 'update') {
    loadTodos();
  }
};

// ブラウザロード時の初回レンダー
loadTodos();