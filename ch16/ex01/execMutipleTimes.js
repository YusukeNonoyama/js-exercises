import { spawn } from "child_process";

const fibNumber = 45;
const threadCounts = [
  1, 2, 4, 6, 8, 10, 20, 1, 2, 4, 6, 8, 10, 20, 1, 2, 4, 6, 8, 10, 20,
];

// 子プロセスで条件を指定してmFib.jsを実行する関数
const runProgram = (numThreads) => {
  return new Promise((resolve, reject) => {
    console.log(`\nRunning program with ${numThreads} thread(s)...`);

    const child = spawn(
      "node",
      ["ch16/ex01/mFib.js", fibNumber.toString(), numThreads.toString()],
      {
        stdio: "inherit", // inherit so we can see console output
      },
    );

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
};

// シーケンシャルに実行する
for (const threads of threadCounts) {
  try {
    await runProgram(threads);
  } catch (e) {
    console.log(e);
  }
}
