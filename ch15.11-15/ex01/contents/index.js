const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // タスクの一覧を取得
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      const body = await response.json();
      // エラーレスポンスの時にalertに内容を表示
      alert(`${response.status}: ${body.message}`);
      return;
    }
    const body = await response.json();
    for (const item of body.items) {
      // appendToDoItemで要素を追加
      appendToDoItem(item);
    }
  } catch (err) {
    alert(err);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    // APIでアイテム追加
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json; charset=UTF-8" }),
      body: JSON.stringify({ "name": todo })
    })
    if (!response.ok) {
      const body = await response.json();
      alert(`${response.status}: ${body.message}`);
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
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");
  const label = document.createElement("label");
  const toggle = document.createElement("input");

  label.textContent = task.name;
  toggle.type = "checkbox";
  toggle.onchange = async function () {
    try {
      let response;
      if (toggle.checked) {
        // APIで取り消し線付きに更新
        response = await fetch(`/api/tasks/${task.id}`, {
          method: "PATCH", body: JSON.stringify({ "status": "completed" })
        })
        label.style.textDecorationLine = "line-through";
      } else {
        // APIで取り消し線なしに更新
        response = await fetch(`/api/tasks/${task.id}`, {
          method: "PATCH", body: JSON.stringify({ "status": "active" })
        })
        label.style.textDecorationLine = "none";
      }
      if (!response.ok) {
        const body = await response.json();
        alert(`${response.status}: ${body.message}`);
        return;
      }
    } catch (err) {
      alert(err);
    }
  };
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.onclick = async function () {
    elem.style.display = "none";
    try {
      // APIで削除
      const response = await fetch(
        `/api/tasks/${task.id}`,
        { method: "DELETE" }
      )
      if (!response.ok) {
        const body = await response.json();
        alert(`${response.status}: ${body.message}`);
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

  const div = document.createElement("div");
  div.append(toggle, label, destroy);
  elem.append(div);
  list.prepend(elem);

  console.log("cookie: ", document.cookie);

}
