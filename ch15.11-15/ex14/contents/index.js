"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();

  button.disabled = "disabled";

  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const message = new EventSource("/message");
  message.addEventListener("message", (event) => {


    const response = JSON.parse(event.data);

    messageElement.textContent = response.value;

    if (response.done) {
      message.close();
      button.disabled = null;
    }
  })
}
