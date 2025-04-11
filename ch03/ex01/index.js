// 正負の  Infinity と NaN で +, -, \*, / の計算を全ての組み合わせでして結果を見なさい。

let a = Infinity;
let b = -Infinity;
let c = NaN;

console.log("plus=======================")
console.log("Infinity, Infinity: ", a + a);
console.log("Infinity, -Infinity: ", a + b);
console.log("Infinity, NaN: ", a + c);
console.log("-Infinity, Infinity: ", b + a);
console.log("-Infinity, -Infinity: ", b + b);
console.log("-Infinity, NaN: ", b + c);
console.log("NaN, Infinity: ", c + a);
console.log("NaN, -Infinity: ", c + b);
console.log("NaN, NaN: ", c + c);

console.log("minus=======================")
console.log("Infinity, Infinity: ", a - a);
console.log("Infinity, -Infinity: ", a - b);
console.log("Infinity, NaN: ", a - c);
console.log("-Infinity, Infinity: ", b - a);
console.log("-Infinity, -Infinity: ", b - b);
console.log("-Infinity, NaN: ", b - c);
console.log("NaN, Infinity: ", c - a);
console.log("NaN, -Infinity: ", c - b);
console.log("NaN, NaN: ", c - c);

console.log("multiply=======================")
console.log("Infinity, Infinity: ", a * a);
console.log("Infinity, -Infinity: ", a * b);
console.log("Infinity, NaN: ", a * c);
console.log("-Infinity, Infinity: ", b * a);
console.log("-Infinity, -Infinity: ", b * b);
console.log("-Infinity, NaN: ", b * c);
console.log("NaN, Infinity: ", c * a);
console.log("NaN, -Infinity: ", c * b);
console.log("NaN, NaN: ", c * c);

console.log("devide=======================")
console.log("Infinity, Infinity: ", a / a);
console.log("Infinity, -Infinity: ", a / b);
console.log("Infinity, NaN: ", a / c);
console.log("-Infinity, Infinity: ", b / a);
console.log("-Infinity, -Infinity: ", b / b);
console.log("-Infinity, NaN: ", b / c);
console.log("NaN, Infinity: ", c / a);
console.log("NaN, -Infinity: ", c / b);
console.log("NaN, NaN: ", c / c);

