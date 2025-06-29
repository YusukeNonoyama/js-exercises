export function retryWithExponentialBackoff(func: () => boolean, maxRetry: number, callback: (result: boolean) => boolean) {
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
        const delay = 2 ** count * 1000;    // 1秒、2秒、4秒、、、
        count++;
        setTimeout(tryFunc, delay);
    }
    tryFunc();
    // setTimeout()を呼び出した後にretryWithExponentialBackoff()は実行終了する  
}


// import { randomInt } from "crypto";

// function func() {
//     let a = randomInt(0, 10);
//     console.log(a);
//     if (a < 1) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function callback(result: boolean) {
//     console.log(result);
// }

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
// retryWithExponentialBackoff(func, 3, callback);
