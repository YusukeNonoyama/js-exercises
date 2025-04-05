class Example  {
    valueOf() {
        console.log(this);
        // if (typeof(this) === "number" ) return "valueOf() is called";
        // return {};
        return {};
    }

    toString() {
        return "toString() is called";
    }
}

let obj = new Example();

console.log(+obj);
console.log(obj + " ");
