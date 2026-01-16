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
// 既存のSessionStrageを読み込む
const todoListSessionStorage = JSON.parse(sessionStorage.getItem("todoList"));

if (!todoListSessionStorage) {
  // SessionStorageがない場合は初期化
  id = 1;
  sessionStorage.setItem("todoList", JSON.stringify(todoList));
} else {
  //SessionnStrageにデータがある場合は中のアイテムをtodoListに保存してレンダー
  for (const item of todoListSessionStorage) {
    todoList.push(item);
    appendToDoItem(todoList, item.id);
  }
  // 既存の最大idより1大きいidを設定
  id = Math.max(...todoListSessionStorage.map((item) => item.id)) + 1;
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
  todoList.push({ id: currentId, name: todo, status: "active" });
  // SessionStorageを更新
  sessionStorage.setItem("todoList", JSON.stringify(todoList));

  appendToDoItem(todoList, id);
  id += 1;
});

function appendToDoItem(todoList, id) {
  // 既存のリスト内の該当idのアイテムを取得
  const item = todoList.find((o) => o.id === id);

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
  toggle.addEventListener("click", () => {
    if (toggle.checked) {
      item.status = "completed";
      label.style.textDecorationLine = "line-through";
    } else {
      item.status = "active";
      label.style.textDecorationLine = "none";
    }
    sessionStorage.setItem("todoList", JSON.stringify(todoList));
    console.log("toggle: ", todoList);
  });

  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    // リスト内の該当idのインデックスを取得
    const index = todoList.findIndex((o) => o.id === id);
    todoList.splice(index, 1);
    console.log("deleted:", todoList);

    elem.remove();
    sessionStorage.setItem("todoList", JSON.stringify(todoList));
  });

  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}
