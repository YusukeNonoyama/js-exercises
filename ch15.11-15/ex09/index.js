const socket = new WebSocket("ws://localhost:3003")

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const btnStart = document.querySelector("#btn-start");
const btnPause = document.querySelector("#btn-pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

let grid = new Array(ROWS)
    .fill(null)
    .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    );

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

canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    sound.cloneNode().play();

    // cクリックされたcanvasのセルをサーバーに送る
    socket.send(JSON.stringify({
        "type": "toggle",
        "row": row,
        "col": col
    }))
});

// アニメーション部分は不要のため削除（サーバーから１秒に10回送られる情報でgridを更新するだけ）

// start情報をサーバーに送る
btnStart.addEventListener("click", () => {
    console.log("started");
    socket.send(JSON.stringify({ "type": "start" }));
})

// pause情報をサーバーに送る
btnPause.addEventListener("click", () => {
    console.log("pause");
    socket.send(JSON.stringify({ "type": "pause" }));
})

// update情報を受け取ったときにgridを更新する
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "update") {
        // console.log("message received for update: ", msg.grid);
        const grid = msg.grid;
        renderGrid(grid);
    }
})

// 初回レンダー
renderGrid(grid);