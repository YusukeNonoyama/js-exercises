const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// アイテムの型はex01のServer記載のものと同じ
// type Item = {
//   id: number;
//   name: string;
//   status: "active" | "completed";
// };

const todoList = []; // ToDoを格納するリスト
let id; // ToDoアイテムのインデックス
const todoListLocalStorage = JSON.parse(localStorage.getItem("todoList"));

if (!todoListLocalStorage) {  // 初期化
  id = 1;
  localStorage.setItem("todoList", JSON.stringify(todoList));
} else {  // localStrageにデータがある場合
  id = Math.max(...todoListLocalStorage.map(item => item.id)) + 1;  // 既存の最大idより1大きいidを設定
  for (const item of todoListLocalStorage) {
    todoList.push(item);
    appendToDoItem(todoList, item.id);
  }
}

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // → submit イベントが実行されたあと、ページがリロードされてしまう
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();

  // new-todo の中身は空にする
  input.value = "";

  // リストにアイテムを挿入
  const currentId = id;
  todoList.push({ "id": currentId, "name": todo, status: "active" });
  localStorage.setItem("todoList", JSON.stringify(todoList));

  appendToDoItem(todoList, id);
  id += 1;
});

window.addEventListener("storage", () => {
  location.reload();
})

function appendToDoItem(todoList, id) {

  // ここから #todo-list に追加する要素を構築する1
  const item = todoList.find(o => o.id === id);

  const elem = document.createElement("li");
  const label = document.createElement("label");
  label.textContent = item["name"];
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");

  if (item.status === "completed") {
    label.style.textDecorationLine = "line-through";
    toggle.checked = true;
  } else {
    label.style.textDecorationLine = "none";
    toggle.checked = false;
  }

  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
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

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.onclick = function () {
    const index = todoList.findIndex(o => o.id === id);
    todoList.splice(index, 1);
    console.log("deleted:", todoList);

    elem.style.display = "none";
    localStorage.setItem("todoList", JSON.stringify(todoList));

  };

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  const div = document.createElement("div");
  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}