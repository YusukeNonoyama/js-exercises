// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
    .fill(null)
    .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    );

// grid を canvas に描画する
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

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
            const neighbours = [
                [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
            ];
            let numOfAlive = 0;
            neighbours.forEach((nPos) => {
                const pos = [row + nPos[0], col + nPos[1]];
                // 境界セルの場合は定義されていないセルをスキップ
                if (pos.every(e => e >= 0 && e < 50)) {
                    // if (pos.every(e => e >= 0)) {
                    numOfAlive += grid[pos[0]][pos[1]]
                }
            })
            // 対象セイルが生存の場合の周囲のセルの生存数
            // * ２未満なら or ４以上なら false(dead)
            // * ２、３なら true(alive)
            // 対象セイルが死の場合の周囲のセルの生存数
            // * ３なら true(alive)
            // * ３以外なら false(dead)
            if (nextGrid[row][col] === true) {
                if (numOfAlive >= 2 && numOfAlive <= 3) {
                    nextGrid[row][col] = true;
                } else {
                    nextGrid[row][col] = false;
                }
            } else {
                if (numOfAlive === 3) {
                    nextGrid[row][col] = true;
                } else {
                    nextGrid[row][col] = false;
                }
            }
        }
    }
    return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    grid[row][col] = !grid[row][col];
    sound.cloneNode().play();
    renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
let previousTime = 0;
const interval = 100;
function update(timestamp) {
    if (!previousTime) {
        previousTime = timestamp;
    }
    const elapsed = timestamp - previousTime;
    if (elapsed > interval) {
        previousTime = timestamp;
        grid = updateGrid(grid);
        renderGrid(grid);
    }
    animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
    // 既にアニメーションが動いている場合は何もしない
    if (animationId) {
        return;
    }
    update();
});

pauseButton.addEventListener("click", () => {
    // アニメーションが停止している場合は何もしない
    if (!animationId) {
        return;
    }
    cancelAnimationFrame(animationId);
    animationId = null;
});

renderGrid(grid);
