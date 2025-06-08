const pattern = /^(a|aa)+$/u

// const string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";
const string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";

let start = Date.now();
console.log(string.match(pattern));
let end = Date.now();

console.log(end - start, "ms");