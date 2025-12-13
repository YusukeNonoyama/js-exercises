const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// アイテムの型はex01のServer記載のものと同じ
// type Item = {
//   id: number;
//   name: string;
//   status: "active" | "completed";
// };

// ToDoを格納するリスト
const todoList = [];
// ToDoアイテムのインデックス
let id;
// 既存のLocalStrageを読み込む
const todoListLocalStorage = JSON.parse(localStorage.getItem("todoList"));

if (!todoListLocalStorage) {
  // LocalStorageがない場合は初期化
  id = 1;
  localStorage.setItem("todoList", JSON.stringify(todoList));
} else {
  // localStrageにデータがある場合は中のアイテムをtodoListに保存してレンダー
  for (const item of todoListLocalStorage) {
    todoList.push(item);
    appendToDoItem(todoList, item.id);
  }
  // 既存リストの最大idより1大きいidを設定
  id = Math.max(...todoListLocalStorage.map(item => item.id)) + 1;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  // リストにアイテムを挿入
  const currentId = id;
  todoList.push({ "id": currentId, "name": todo, status: "active" });
  // LocalStrageを更新
  localStorage.setItem("todoList", JSON.stringify(todoList));

  appendToDoItem(todoList, id);
  id += 1;
});

// LocalStrageが変更されたときに、同一オリジンのページにイベントを発生
window.addEventListener("storage", () => {
  location.reload();
})

// ToDoアイテムをレンダーする関数
function appendToDoItem(todoList, id) {
  // リスト内の該当idのアイテムを取得
  const item = todoList.find(o => o.id === id);

  const elem = document.createElement("li");
  const label = document.createElement("label");
  const toggle = document.createElement("input");
  const destroy = document.createElement("button");
  const div = document.createElement("div");

  label.textContent = item["name"];
  label.style.textDecorationLine = "none";

  if (item.status === "completed") {
    label.style.textDecorationLine = "line-through";
    toggle.checked = true;
  } else {
    label.style.textDecorationLine = "none";
    toggle.checked = false;
  }

  toggle.type = "checkbox";
  toggle.onchange = function () {
    if (toggle.checked) {
      item.status = "completed";
      label.style.textDecorationLine = "line-through";
    } else {
      item.status = "active";
      label.style.textDecorationLine = "none";
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log("toggle: ", todoList);
  };

  destroy.textContent = "❌";
  destroy.onclick = function () {
    // リスト内の該当idのインデックスを取得
    const index = todoList.findIndex(o => o.id === id);
    todoList.splice(index, 1);
    console.log("deleted:", todoList);

    elem.remove();
    localStorage.setItem("todoList", JSON.stringify(todoList));

  };

  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}