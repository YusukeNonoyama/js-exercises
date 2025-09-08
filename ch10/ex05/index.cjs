const { fooRenamed: foo, Bar } = require("./module.cjs");

console.log(foo());
console.log(new Bar().bazRenamed());
