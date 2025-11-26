const btnCheck = document.querySelector("#ws-check");
const btnSend = document.querySelector("#ws-send");

let socket = new WebSocket("ws://localhost:3003");

let requestId = 0;
const pendingRequests = new Map();

// 共通メッセージハンドラ（1つだけ！）
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    // 受け取ったら返事する
    if (msg.type === "request") {
        socket.send(JSON.stringify({
            type: "response",
            requestId: msg.requestId,
            data: `hello, ${msg.data}`
        }));
        return;
    }

    // これはレスポンス
    if (msg.type === "response" && pendingRequests.has(msg.requestId)) {
        pendingRequests.get(msg.requestId)(msg.data);
        pendingRequests.delete(msg.requestId);
        return;
    }
});

btnCheck.addEventListener("click", () => {
    console.log("connection state: ", socket.readyState);
});

btnSend.addEventListener("click", async () => {
    requestId++;
    const id = requestId;

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
        pendingRequests.set(reqId, resolve);

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


// const btnCheck = document.querySelector("#ws-check");
// const btnSend = document.querySelector("#ws-send");

// let socket = new WebSocket("ws://localhost:3003");

// // リクエストを受け取ったブラウザで実行される
// socket.addEventListener("message", (event) => {
//     socket.send(`hello, ${event.data}`);
// });

// btnCheck.addEventListener("click", async () => {
//     console.log("connection state: ", socket.readyState);
// });

// let requestId = 0

// btnSend.addEventListener("click", async () => {
//     requestId++;
//     let id = requestId;

//     const inputText = "Yuss";
//     console.log("connected to ws://localhost:3003");

//     try {
//         console.log(`request sent for id ${id}`);
//         const response = await sendRequest(inputText);
//         console.log(`message recieved for id ${id}:`, response);
//     } catch (e) {
//         console.log(`error occured for id ${id}: `, e);
//     }
//     function sendRequest(text) {
//         return new Promise((resolve, reject) => {

//             function handleMessage(event) {
//                 resolve(event.data);
//                 socket.removeEventListener("message", handleMessage);  // イベントリスナーは毎回削除
//             }

//             socket.addEventListener("message", handleMessage);
//             socket.addEventListener("close", () => {
//                 reject("connection closed");
//             });
//             setTimeout(() => reject("timeout"), 8000);
//             socket.send(text);
//         })
//     }
// });

