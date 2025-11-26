console.log("connection start...");
let socket = new WebSocket("ws://localhost:3003")
const inputText = "Yuss";

const btnCheck = document.querySelector("#ws-check");
const btnSend = document.querySelector("#ws-send");

socket.addEventListener("open", () => {
    console.log("successfully connected to ws://localhost:3003");
});

btnCheck.addEventListener("click", () => {
    console.log("Connection Status: ", socket.readyState);
});

socket.addEventListener("message", (event) => {
    socket.close();

    let socketResponse = new WebSocket("ws://localhost:3003")
    socketResponse.addEventListener("open", () => {
        socketResponse.send(`hello, ${event.data}`);

    });
});

// 
btnSend.addEventListener("click", async () => {
    try {
        const response = await sendRequest(inputText);
        console.log("message recieved: ", response);
    } catch (e) {
        console.log("error:", e);
    }
});

function sendRequest(text) {
    return new Promise((resolve, reject) => {

        function handleMessage(event) {
            resolve(event.data);
            socket.removeEventListener("message", handleMessage);  // イベントリスナーは毎回削除
        }

        socket.addEventListener("message", handleMessage);
        socket.addEventListener("close", () => {
            reject("connection closed");
        });
        setTimeout(() => reject("timeout"), 8000);
        socket.send(text);
    })
}
