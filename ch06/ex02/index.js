let o = {x: 1, y: 2};
let o2 = Object.create(o);

console.log(o2);    // {}
console.log(Object.getPrototypeOf(o2)); // { x: 1, y: 2 }
