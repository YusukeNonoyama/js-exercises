// * 受け取った関数 func を呼び出し、func が true を返せばそこで終了する
// * func が false を返した場合は以下の待ち時間後に func 呼び出しをリトライする
// * 待ち時間はfuncの呼び出し回数に応じて 1 秒, 2 秒, 4 秒, ...と 2 倍に増えていく
// * maxRetry 回リトライしても成功しない場合はそこで終了する
// * retryWithExponentialBackoffに対する呼び出しは即座に完了し、func の呼び出しは非同期に行われる
// * func が true を返す、または maxRetry 回のリトライが失敗し終了する際、その結果(true/false)を引数として関数 callback が呼び出される

export async function retryWithExponentialBackoff(
  func: () => boolean,
  maxRetry: number,
  callback: (result: boolean) => boolean,
) {
  let count = 0;
  // tryFunc()を定義してsetTimeout()内で繰り返し呼び出す
  function tryFunc() {
    const result = func();
    if (result === true) {
      callback(true);
      return;
    }
    if (count >= maxRetry) {
      callback(false);
      return;
    }
    const delay = 2 ** count * 1000; // 1秒、2秒、4秒、、、
    setTimeout(tryFunc, delay);
    count++;
  }
  await tryFunc();
}

import { randomInt } from "crypto";

function func() {
  let a = randomInt(0, 10);
  console.log(a);
  if (a < 1) {
    return true;
  } else {
    return false;
  }
}

function callback(result: boolean) {
  console.log(result);
  return result;
}

// let count = 0;
// function func() {
//     count++;
//     console.log(count);
//     if (count === 5) {
//         return true;
//     } else {
//         return false;
//     }
// }
retryWithExponentialBackoff(func, 3, callback);
