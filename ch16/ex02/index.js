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

// startChild();
// while (true) {
// const res = await startChild();

// if (res[0]) {
//   startChild()
// };
// }

// console.log(res);

let isShuttingDown = false;

// メインルーチン
async function main() {
  while (!isShuttingDown) {
    console.log("pid:", process.pid);
    console.log("子プロセスを起動します...");
    const [code, signal] = await startChild();

    if (isShuttingDown) {
      console.log(`子プロセスがシグナル ${signal} により終了しました。親プロセスも終了します。`);
      break;
    }

    if (code !== 0) {
      console.error(`子プロセスが異常終了しました (コード: ${code})。再起動します...`);
    } else {
      console.log("子プロセスが正常終了しました。");
      break;
    }
  }
}

// シグナルのトラップ
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    console.log(`\n親プロセスが ${signal} を受信しました。子プロセスに通知します。`);
    isShuttingDown = true;
    if (child) {
      child.kill(signal); // 子プロセスに同じシグナルを送信
    }
  });
});

main().catch(console.error);