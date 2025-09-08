let o = { x: 1, y: { z: 3 } };
let a = [o, 4, [5, 6]];
console.log(a[2][1]);
console.log(a[2]["1"]);
console.log(a[2]["0"]);
console.log(a[2]["one"]);
console.log(o["x"]);
// console.log(o[x]);

/////////////////////////////////////////////
const num = 42;
const big = BigInt(num);

// console.log(typeof big);
// console.log(+big);

/////////////////////////////////////////////
console.log(null == undefined); // true
console.log(null >= undefined); // false
console.log(undefined == undefined); // true
console.log(undefined >= undefined); // false

/////////////////////////////////////////////
let obj1 = { 1: "one", 2: "two" };
let obj2 = Object.create(obj1);

for (const o in obj2) {
  console.log(o);
}

try {
  aaa = "3";
} catch (e) {
  console.log("catch");
  // throw e;
} finally {
  console.log("finally");
}

console.log("after filnally");
