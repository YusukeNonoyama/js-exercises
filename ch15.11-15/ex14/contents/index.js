"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");

// 送信ボタンクリック時のイベント
button.addEventListener("click", (e) => {
  e.preventDefault();

  // 通信ボタンがクリックされたらボタンを無効化
  button.disabled = "disabled";

  getMessageFromServer();
});

async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい

  // Server-Sentイベント作成
  const message = new EventSource("/message");

  // サーバーからの送信を受け取る
  // * ２秒後に「こんにちは」、５秒後に「さようなら」が送られてくる
  // * 「さようなら」を受け取ったときにresponseのdoneがtrueになる
  message.addEventListener("message", (event) => {
    // 内容を表示
    const response = JSON.parse(event.data);
    messageElement.textContent = response.value;

    // サーバーからの送信が終了したらServer-Sentイベントを終了（doneプロパティがtrue）、同時に送信ボタン有効化
    if (response.done) {
      message.close();
      button.disabled = null;
    }
  });
}
