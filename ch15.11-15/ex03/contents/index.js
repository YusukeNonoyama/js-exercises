const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      mode: 'cors',  // CORS モードでのリクエスト送信を許可
      credentials: 'include',  // クロスオリジンでの Cookie の送信を許可
    }); // タスクの一覧を取得
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
      return;
    }
    const body = await response.json();
    for (const item of body.items) {
      appendToDoItem(item);
    }
  } catch (err) {
    alert(err);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  try {
    const response = await fetch("http://localhost:3001/api/tasks", {  // APIでアイテム追加
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({ "Content-Type": "application/json; charset=UTF-8" }),
      body: JSON.stringify({ "name": todo })
    })
    if (!response.ok) {
      alert("error");
      return;
    }
    const body = await response.json();
    appendToDoItem(body);

  } catch (err) {
    alert(err);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  console.log("task", task);
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.onchange = async function () {
    try {
      let response;
      if (toggle.checked) {
        response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, { // APIで取り消し線付きに更新
          mode: 'cors',
          credentials: 'include',
          method: "PATCH",
          body: JSON.stringify({ "status": "completed" })
        })
        label.style.textDecorationLine = "line-through";
      } else {
        response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {  // APIで取り消し線なしに更新
          mode: 'cors',
          credentials: 'include',
          method: "PATCH",
          body: JSON.stringify({ "status": "active" })
        })
        label.style.textDecorationLine = "none";
      }
      if (!response.ok) {
        alert("error");
        return;
      }
    } catch (err) {
      alert(err);
    }
  };
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.onclick = async function () {
    elem.style.display = "none";
    try {
      const response = await fetch(  // APIで削除
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "DELETE",
          mode: 'cors',
          credentials: 'include'
        }
      )
      if (!response.ok) {
        alert("error");
      }
    } catch (err) {
      alert(err);
    }
  };

  // 読込み時の状態を反映
  if (task.status === "active") {
    label.style.textDecorationLine = "none";
    toggle.checked = false;
  } else {
    label.style.textDecorationLine = "line-through";
    toggle.checked = true;
  }

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  const div = document.createElement("div");
  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);
}
