const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const todoChannel = new BroadcastChannel('todo-channel');

let todoList = [];
const STORE_NAME = "todos";

// DBを開いてコンテキストを渡すcallbackに渡す関数
function withDB(callback) {
  const request = indexedDB.open("todoDB", 1);
  request.onerror = console.error;
  request.onsuccess = () => {
    const db = request.result;
    callback(db);
  };

  request.onupgradeneeded = () => { initdb(request.result, callback); };
}

function initdb(db, callback) {
  const store = db.createObjectStore(STORE_NAME, {
    keyPath: "id",
    autoIncrement: true,  // TODO：なぜ必要？
  });
  store.createIndex("status", "status", { unique: false });
  // テキストのようにデータ取得はここでは不要
}

/**
 * ToDo を読み込んでレンダリング
 */
function loadTodos() {
  withDB((db) => {
    const transaction = db.transaction([STORE_NAME]);
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll();

    request.onerror = console.error;
    request.onsuccess = () => {
      todoList = request.result;

      list.innerHTML = "";
      for (const item of todoList) {
        appendToDoItem(item);
      }
    };
  });
}

/**
 * ToDo を追加
 */
function addTodo(name) {
  withDB((db) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const newItem = {
      name,
      status: "active",
    };

    const request = store.add(newItem);

    request.onsuccess = (event) => {
      const newId = event.target.result;
      const addedItem = { ...newItem, id: newId };

      todoList.push(addedItem);
      appendToDoItem(addedItem);

      todoChannel.postMessage('update');
    };

    request.onerror = (event) => {
      console.error("Error adding todo:", event.target.errorCode);
    };
  });
}

/**
 * ToDo のステータスを更新
 */
function updateTodoStatus(id, newStatus) {
  withDB((db) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const item = event.target.result;
      if (!item) return;

      item.status = newStatus;

      const updateRequest = store.put(item);

      updateRequest.onsuccess = () => {
        const idx = todoList.findIndex(o => o.id === id);
        if (idx !== -1) {
          todoList[idx].status = newStatus;
        }

        todoChannel.postMessage('update');
      };

      updateRequest.onerror = (event) => {
        console.error("Error updating todo:", event.target.errorCode);
      };
    };

    getRequest.onerror = (event) => {
      console.error("Error getting todo:", event.target.errorCode);
    };
  });
}

/**
 * ToDo を削除
 */
function deleteTodo(id, elem) {
  withDB((db) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      const index = todoList.findIndex(o => o.id === id);
      if (index !== -1) todoList.splice(index, 1);

      elem.remove();
      todoChannel.postMessage('update');
    };

    request.onerror = (event) => {
      console.error("Error deleting todo:", event.target.errorCode);
    };
  });
}

function appendToDoItem(item) {
  const elem = document.createElement("li");
  const label = document.createElement("label");
  const toggle = document.createElement("input");
  const destroy = document.createElement("button");
  const div = document.createElement("div");

  label.textContent = item.name;

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
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    updateTodoStatus(item.id, newStatus);
  };

  destroy.textContent = "❌";
  destroy.onclick = function () {
    deleteTodo(item.id, elem);
  };

  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = input.value.trim();
  if (todoName === "") return;
  addTodo(todoName);
  input.value = "";
});

// 初回ロード
loadTodos();

todoChannel.onmessage = (event) => {
  if (event.data === 'update') {
    console.log("Received update from another tab. Reloading...");
    loadTodos();
  }
};
