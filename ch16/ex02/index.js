import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// startChild()が正常終了しなかった場合は次のループで再起動するループ
async function processLoop() {
  while (true) {
    // 子プロセスの起動
    const [code, signal] = await startChild();

    // 子プロセスが正常終了したら（code=0）、親プロセスも終了
    if (!code) {
      console.log(`child process terminated with signal: ${signal}`);
      break;
    }
    // ループから出て親プロセスも終了
    console.log("child process terminated");
  }
}

// シグナルの２種類以上トラップ
["SIGINT", "SIGTERM"].forEach((signal) => {
  // シグナルを受け取るイベントリスナー
  process.on(signal, () => {
    console.log(`\nsignal received: ${signal} `);
    // 子プロセスに同じシグナルを送信して終了させる（デフォルトは`SIGINT`）
    child.kill(signal);
  });
});

// プロセス開始
processLoop();