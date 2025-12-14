// WebSocketオブジェクトを作成
const socket = new WebSocket("ws://localhost:3003")

// canvasで盤面を作成
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const btnStart = document.querySelector("#btn-start");
const btnPause = document.querySelector("#btn-pause");

const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

// 盤面の初期配置を作成
let grid = new Array(ROWS).fill(null).map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
);

// グリッド配列を元にレンダー
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}

// 盤面をクリックしたときのイベント
canvas.addEventListener("click", function (evt) {
    // クリック箇所を特定
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    sound.cloneNode().play();

    // クリックされたcanvasのセルをサーバーに送る
    socket.send(JSON.stringify({
        "type": "toggle",
        "row": row,
        "col": col
    }))
});

// アニメーション部分は不要のため削除（サーバーから１秒に10回送られる情報でgridを更新するだけ）

// startをクリックしたときのイベント
btnStart.addEventListener("click", () => {

    // startをサーバーへ送信
    socket.send(JSON.stringify({
        "type": "start"
    }));

})

// pauseをクリックしたときのイベント
btnPause.addEventListener("click", () => {

    // pauseをサーバーへ送信
    socket.send(JSON.stringify({
        "type": "pause"
    }));

})

// messageを受け取ったときのイベント
socket.addEventListener("message", (event) => {

    // gridを更新する
    const msg = JSON.parse(event.data);
    if (msg.type === "update") {
        const grid = msg.grid;
        renderGrid(grid);
    }
})

// 初回レンダー
renderGrid(grid);