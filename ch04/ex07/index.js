// `const geval = eval;`を加えた。定義した変数をグローバル変数にするため
function set42(key) {
    const geval = eval;
    geval(`${key} = 42;`);  // varがなくてもエラー出ないのはなぜ？
}

// ずっとiに42を代入し続ける
set42("while (true) i");

// グローバルオブジェクトを出力する
set42("console.log(globalThis); i");

// 出力結果
// <ref *1> Object [global] {
//   global: [Circular *1],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Getter]
//   },
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Getter]
//   },
//   queueMicrotask: [Function: queueMicrotask],
//   structuredClone: [Function: structuredClone],
//   atob: [Getter/Setter],
//   btoa: [Getter/Setter],
//   performance: [Getter/Setter],
//   fetch: [Function: fetch],
//   crypto: [Getter]
// }