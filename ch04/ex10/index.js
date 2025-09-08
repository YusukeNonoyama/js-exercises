let array_a = ["r", "i", "c", "o", "h"];

console.log("配列の内容", array_a);

delete array_a[3];

console.log("配列の内容", array_a);
console.log("配列の長さ", array_a.length);

// 実行コマンド： node ch04/ex10/index.js

// 配列の内容 [ 'r', 'i', 'c', 'o', 'h' ]
// 配列の内容 [ 'r', 'i', 'c', <1 empty item>, 'h' ]
// 配列の長さ 5
