// p.149 冒頭のコード
let o: { [prop: string]: number } = {};    // メモ：Index Signature (Typescriptの仕様)
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;

// o が p および q のプロトタイプチェーン上に存在する
console.log(o.isPrototypeOf(p));    // true
console.log(o.isPrototypeOf(q));    // true
console.log(p.isPrototypeOf(o));    // false
console.log(q.isPrototypeOf(o));    // false

// p が q のプロトタイプチェーン上に存在する
console.log(p.isPrototypeOf(q));    // true
console.log(q.isPrototypeOf(p));    // false

// Object, Array, Date, Map のプロトタイプチェーンの継承関係
// Objectはいずれからも継承されるがその他は継承関係はない
console.log("Object => Array:", Object.prototype.isPrototypeOf(Array));    // true
console.log("Object => Date:", Object.prototype.isPrototypeOf(Date));    // true
console.log("Object => Map:", Object.prototype.isPrototypeOf(Map));    // true

console.log("Array => Object:", Array.prototype.isPrototypeOf(Object));    // false
console.log("Array => Date:", Array.prototype.isPrototypeOf(Date));    // false
console.log("Array => Map:", Array.prototype.isPrototypeOf(Map));    // false

console.log("Date => Object:", Date.prototype.isPrototypeOf(Object));    // false
console.log("Date => Date:", Date.prototype.isPrototypeOf(Date));    // false
console.log("Date => Map:", Date.prototype.isPrototypeOf(Map));    // false

console.log("Map => Object:", Map.prototype.isPrototypeOf(Object));    // false
console.log("Map => Array:", Map.prototype.isPrototypeOf(Array));    // false
console.log("Map => Date:", Map.prototype.isPrototypeOf(Date));    // false
