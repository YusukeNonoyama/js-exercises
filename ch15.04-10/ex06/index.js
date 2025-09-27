const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.form = this.shadowRoot.querySelector("#new-todo-form");
        // TODO: 残りを実装
        this.input = this.shadowRoot.querySelector("#new-todo");
        this.list = this.shadowRoot.querySelector("#todo-list");

        // li のテンプレートを追加
        const templateLi = document.createElement("template");
        templateLi.innerHTML = `\
        <li>
        <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="content"></label>
            <button class="destroy">❌</button>
        </div>
        </li>
        `;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.input.value.trim() === "") {
                return;
            }
            const todo = this.input.value.trim();
            this.input.value = "";

            const clone = templateLi.content.cloneNode(true);
            const li = clone.querySelector("li");
            const toggle = clone.querySelector("input");
            const label = clone.querySelector("label");
            const destroy = clone.querySelector("button");

            toggle.addEventListener("change", () => {
                li.classList.toggle("completed", toggle.checked);
            });
            label.textContent = todo;
            destroy.addEventListener("click", () => {
                li.remove();
            });

            this.list.append(li);
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // 
    }
}

TodoApp.observedAttributes = [""];

customElements.define("todo-app", TodoApp);
