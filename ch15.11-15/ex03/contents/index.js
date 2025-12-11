const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      // CORS モードでのリクエスト送信を許可
      mode: 'cors',
      // クロスオリジンでの Cookie の送信を許可
      credentials: 'include',
    });
    if (!response.ok) {
      const body = await response.json();
      alert(`${response.status}: ${body.message}`);
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
  e.preventDefault();
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
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

function appendToDoItem(task) {
  console.log("task", task);
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.onchange = async function () {
    try {
      let response;
      if (toggle.checked) {
        response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
          mode: 'cors',
          credentials: 'include',
          method: "PATCH",
          body: JSON.stringify({ "status": "completed" })
        })
        label.style.textDecorationLine = "line-through";
      } else {
        response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
          mode: 'cors',
          credentials: 'include',
          method: "PATCH",
          body: JSON.stringify({ "status": "active" })
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
      const response = await fetch(
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "DELETE",
          mode: 'cors',
          credentials: 'include'
        }
      )
      if (!response.ok) {
        const body = await response.json();
        alert(`${response.status}: ${body.message}`);
      }
    } catch (err) {
      alert(err);
    }
  };

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
}
