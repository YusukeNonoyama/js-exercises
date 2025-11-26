const btnCheck = document.querySelector("#ws-check");
const btnSend = document.querySelector("#ws-send");

let socket = new WebSocket("ws://localhost:3003");

let requestId = 0;

// リクエストIDとプロミスのresolve関数を保持するマップ
const pendingRequests = new Map();

// メッセージのハンドラ（リクエスト受け取り、レスポンス受け取り）
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    // メッセージがリクエストの場合
    if (msg.type === "request") {
        // レスポンスを送り返す
        socket.send(JSON.stringify({
            type: "response",
            requestId: msg.requestId,
            data: `hello, ${msg.data}`
        }));
        return;
    }

    // メッセージがレスポンスの場合、タイムアウトしていたら実行しない
    if (msg.type === "response" && pendingRequests.has(msg.requestId)) {
        // 該当するIDのプロミスを解決する
        pendingRequests.get(msg.requestId).resolve(msg.data);
        pendingRequests.delete(msg.requestId); // プロミスが解決したら消す（エラー時に再び呼ばれないよ）
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

// TODO: あとで削除
btnCheck.addEventListener("click", () => {
    console.log("connection state: ", socket.readyState);
});

// 送信ボタンを押すとsendRequestが非同期で呼ばれる
btnSend.addEventListener("click", async () => {
    const id = ++requestId;

    try {
        console.log(`request sent for id ${id}`);
        const response = await sendRequest("Yuss", id);
        console.log(`message received for id ${id}:`, response);
    } catch (e) {
        console.log(`error occurred for id ${id}: `, e);
    }
});

function sendRequest(data, reqId) {
    return new Promise((resolve, reject) => {
        pendingRequests.set(reqId, { resolve, reject });

        // タイムアウト時にrejectしマップから対象IDの情報を消す。
        setTimeout(() => {
            if (pendingRequests.has(reqId)) {
                pendingRequests.delete(reqId);
                reject("timeout");
            }
        }, 5000);

        socket.send(JSON.stringify({
            type: "request",
            requestId: reqId,
            data: data
        }));
    });
}
