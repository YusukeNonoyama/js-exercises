const btnCheck = document.querySelector("#ws-check");
const btnSend = document.querySelector("#ws-send");
const input1 = document.querySelector("#input-1");
const input2 = document.querySelector("#input-2");
const input3 = document.querySelector("#input-3");
const input4 = document.querySelector("#input-4");
const input5 = document.querySelector("#input-5");
const label1 = document.querySelector("#label-1");
const label2 = document.querySelector("#label-2");
const label3 = document.querySelector("#label-3");
const label4 = document.querySelector("#label-4");
const label5 = document.querySelector("#label-5");

// TODO: あとで削除
btnCheck.addEventListener("click", () => {
    console.log("connection state: ", socket.readyState);
});


let socket = new WebSocket("ws://localhost:3003");

let requestId = 0;

// リクエストIDとリクエストのプロミスを保持するマップ
const pendingRequests = new Map();

// メッセージ受信時のハンドラ
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    // メッセージがリクエストの場合、レスポンスを送り返す
    if (msg.type === "request") {
        socket.send(JSON.stringify({
            type: "response",
            requestId: msg.requestId,
            data: `hello, ${msg.data}`
        }));
        return;
    }

    // メッセージがレスポンスの場合、該当するIDのプロミスを解決する、タイムアウトしていたら実行しない
    if (msg.type === "response" && pendingRequests.has(msg.requestId)) {
        pendingRequests.get(msg.requestId).resolve(msg.data);
        pendingRequests.delete(msg.requestId);
        return;
    }
});

// WebSocketの接続が切断した場合、その時点で残っているリクエストを全てrejectする
socket.addEventListener("close", () => {
    for (const request of pendingRequests) {
        pendingRequests.get(request[0]).reject("connection closed");;
        pendingRequests.delete(request[0]);
    }
});

// 送信ボタンを押すとsendRequestが非同期で呼ばれる
btnSend.addEventListener("click", async () => {
    console.log("message sent...")
    // const id = ++requestId;

    const promises = [
        sendRequest(input1.value.trim(), 1),
        sendRequest(input2.value.trim(), 2),
        sendRequest(input3.value.trim(), 3),
        sendRequest(input4.value.trim(), 4),
        sendRequest(input5.value.trim(), 5)
    ]

    Promise.allSettled(promises).then(results => {
        label1.textContent = results[0].value || results[0].reason
        label2.textContent = results[1].value || results[1].reason
        label3.textContent = results[2].value || results[2].reason
        label4.textContent = results[3].value || results[3].reason
        label5.textContent = results[4].value || results[4].reason
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
        console.log(results[3]);
        console.log(results[4]);
    })

    // 連続クリックをidでトラックできるようにしたコード
    // try {
    //     console.log(`request sent for id ${id}`);
    //     const response = await sendRequest(input, id);
    //     console.log(`message received for id ${id}:`, response);
    // } catch (e) {
    //     console.log(`error occurred for id ${id}: `, e);
    // }


});

function sendRequest(data, requestId) {
    return new Promise((resolve, reject) => {
        pendingRequests.set(requestId, { resolve, reject });

        // タイムアウト時にrejectしマップから対象IDの情報を消す。
        setTimeout(() => {
            if (pendingRequests.has(requestId)) {
                pendingRequests.delete(requestId);
                reject("timeout");
            }
        }, 8000);

        socket.send(JSON.stringify({
            type: "request",
            requestId,
            data
        }));
    });
}
