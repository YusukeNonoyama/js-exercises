const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const button = document.querySelector("#submit-button");
let destroy;

function disableActions() {
  // fetch実行中はボタンを無効化
  button.disabled = true;
  input.disabled = true;
}

function enableActions() {
  // fetch実行中はボタンを無効化
  button.disabled = false;
  input.disabled = false;
}

// fetchが失敗したらリトライする関数。リトライまでの時間は回数に応じて倍になる。
async function fetchRetryWithExponentialBackoff(url, options) {
  let count = 0;

  async function tryFunc() {
    const response = await fetch(url, options);
    if (response.ok || count >= 3) {
      return response;
    }

    const delay = 2 ** count * 1000;
    count++;

    await new Promise(resolve => setTimeout(resolve, delay));
    return tryFunc();
  }

  return await tryFunc(); // Return the final response
}

// 一定時間経つとfetchをabortする関数
async function fetchWithTimeout(url, options = {}) {

  disableActions();

  if (options.timeout) {
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    },
      options.timeout);
  }
  return await fetchRetryWithExponentialBackoff(url, options);
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetchWithTimeout("/api/tasks", { timeout: 3000 }); // タスクの一覧を取得

    if (!response.ok) {
      alert("error");
      return;
    }
    const body = await response.json();
    for (const item of body.items) {
      appendToDoItem(item);
    }
  } catch (err) {
    alert("fetch timeout");
  } finally {
    enableActions()
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
    const response = await fetchWithTimeout("/api/tasks", {  // APIでアイテム追加
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json; charset=UTF-8" }),
      body: JSON.stringify({ "name": todo }),
      timeout: 3000
    })

    if (!response.ok) {
      alert("error");
      return;
    }
    const body = await response.json();
    appendToDoItem(body);

  } catch (err) {
    alert("fetch timeout");
  } finally {
    enableActions()
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

      toggle.disabled = true;
      destroy.disabled = true;

      if (toggle.checked) {
        response = await fetchWithTimeout(`/api/tasks/${task.id}`, { // APIで取り消し線付きに更新
          method: "PATCH",
          body: JSON.stringify({ "status": "completed" }),
          timeout: 3000
        })

        label.style.textDecorationLine = "line-through";

      } else {
        response = await fetchWithTimeout(`/api/tasks/${task.id}`, {  // APIで取り消し線なしに更新
          method: "PATCH",
          body: JSON.stringify({ "status": "active" }),
          timeout: 3000
        })
        label.style.textDecorationLine = "none";
      }
      if (!response.ok) {
        alert("error");
        return;
      }
    } catch (err) {
      alert("fetch timeout");
    } finally {
      enableActions()
      toggle.disabled = false;
      destroy.disabled = false;
    }
  };
  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい

  destroy.textContent = "❌";

  destroy.onclick = async function () {
    destroy.disabled = true;
    toggle.disabled = true;

    try {
      const response = await fetchWithTimeout(  // APIで削除
        `/api/tasks/${task.id}`,
        {
          method: "DELETE",
          timeout: 3000
        }
      )

      if (!response.ok) {
        alert("error");
      }

      elem.style.display = "none";

    } catch (err) {
      alert("timeout");
    } finally {
      enableActions()
      destroy.disabled = false;
      toggle.disabled = false;
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
