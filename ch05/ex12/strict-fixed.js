let a = 1;
let b = 2;
let obj = { a: 3, b: 4 };
obj.a = obj.b;
console.log(JSON.stringify({ a, b, obj }));

// {"a":1,"b":2,"obj":{"a":4,"b":4}}
