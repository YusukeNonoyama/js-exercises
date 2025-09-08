// 予想
// typeof undefined => undefined
// typeof null => object
// typeof オブジェクト => object
// typeof NaN => number
// typeof 数値 => number
// typeof 関数 => function

function func1(a, b) {
  return a + b;
}

console.log(typeof undefined); // => undefined
console.log(typeof null); // => object
console.log(typeof { x: 1 }); // => object
console.log(typeof NaN); // => number
console.log(typeof 4); // => number
console.log(typeof func1); // => function

// 予想通り。テキストに書いてあった。
