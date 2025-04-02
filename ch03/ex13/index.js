class Example  {
    valueOf() {
        // console.log("valueOf() in Example class is called")
        return {};
    }

    toString() {
        // console.log("toString() in Example class is called")
        return "toString() is called";
    }
}

let obj = new Example();

console.log(+obj);
console.log(obj + " ");

// 両方呼ばれてreturnが変わる形になっている。これでよいのだろうか。