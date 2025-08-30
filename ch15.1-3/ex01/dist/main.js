/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    e.preventDefault(); // これがないと実行後に元のhtmlにってしまう
    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
        return;
    }
    const todo = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";

    // ここから #todo-list に追加する要素を構築する1
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox"
    toggle.onchange = function () {
        if (toggle.checked) {
            label.style.textDecorationLine = "line-through";
        } else {
            label.style.textDecorationLine = "none";
        }
    }
    // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
    const destroy = document.createElement("button");
    destroy.textContent = "❌"
    // TODO: destroy がクリック (click) された場合に elem を削除しなさい
    destroy.onclick = function () {
        elem.remove();
    }
    const div = document.createElement("div");

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    div.append(toggle, label, destroy);
    elem.append(div);
    list.prepend(elem);
});

/******/ })()
;