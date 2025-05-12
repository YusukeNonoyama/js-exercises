let a = 1;
let b = 2;
let obj = { a: 3, b: 4 };
with (obj) {
    a = b;
}
console.log(JSON.stringify({ a, b, obj }));


// 実行コマンド
// node .\ch05\ex12\strict.js

// 実行結果
// file:///C:/Users/r00481995/Documents/javascript/js-exercises/ch05/ex12/strict.js:4
// with (obj) {
// ^^^^
// SyntaxError: Strict mode code may not include a with statement
//     at compileSourceTextModule (node:internal/modules/esm/utils:340:16)
//     at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:146:18)
//     at #translate (node:internal/modules/esm/loader:431:12)
//     at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:478:27)
//     at async ModuleJob._link (node:internal/modules/esm/module_job:110:19)
// Node.js v20.19.0


// ブラウザで実行
// 実行結果
// {"a":1,"b":2,"obj":{"a":4,"b":4}}