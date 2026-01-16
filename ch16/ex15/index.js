import threads from "worker_threads";

if (threads.isMainThread) {
  // 1. sharedArray を number 型の変数 num にする
  // let sharedBuffer = new SharedArrayBuffer(4);
  // let sharedArray = new Int32Array(sharedBuffer);
  let num = 0;

  const __filename = import.meta.filename;
  let worker = new threads.Worker(__filename, { workerData: num });

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      // 2. メインスレッドの for ループで Atomic.add の代わりに num をインクリメントする
      // Atomics.add(sharedArray, 0, 1); // Threadsafe atomic increment
      num++;
    }

    worker.on("message", (message) => {
      // 3-2. メインスレッドではそのメッセージを受信したら num をインクリメントする
      // console.log(Atomics.load(sharedArray, 0));
      if (message === "increment num") {
        num++;
      } else if (message === "done") {
        console.log(num);
      }
    });
  });
} else {
  let num = threads.workerData;
  for (let i = 0; i < 10_000_000; i++) {
    // 3-1. サブスレッドの for ループで Atomic.add の代わりにメインスレッドに"num をインクリメントせよ"というメッセージを送り、
    // Atomics.add(sharedArray, 0, 1); // Threadsafe atomic increment
    threads.parentPort.postMessage("increment num");
  }
  threads.parentPort.postMessage("done");
}

// 問題： このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか書きなさい。
// 解答： アクターモデルと呼ぶ（動作はだいぶ遅かった）
