class Example  {
    valueOf() {
        console.log("valueOf() is called");
        return 200;
    }

    toString() {
        console.log("toString() is called");
        return "200";
    }
}

let obj = new Example();

console.log(+obj);  // valueOf()を呼び出す
console.log(`${obj}`);  // テンプレートリテラルでtoString()を呼び出す
// console.log(String(obj));   // これはほぼ直接呼んでいる
