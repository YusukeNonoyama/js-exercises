// 予想
// typeof undefined => undefined
// typeof null => object
// typeof オブジェクト => object
// typeof NaN => number
// typeof 数値 => number
// typeof 関数 => function

function func1 (a, b){
    return a + b;
}

console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {x: 1});
console.log(typeof NaN);
console.log(typeof 4);
console.log(typeof func1);

// 予想通り。テキストに書いてあったから。