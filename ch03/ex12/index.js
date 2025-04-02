// obj1とobj2を別々に作って===で比較
let obj1 = { "x": 100 };
console.log(obj1);
obj1["y"] = "dollars";
console.log(obj1);

let obj2 = { "x": 100, "y": "dollars" };
console.log(obj2);

console.log("// obj1とobj2の`===`比較");
console.log(obj1 === obj2);

// obj1とobj2を別々に作って要素同士で比較
console.log("// obj1とobj2の要素同士を比較");
export function equals(a, b) {
    // if (Object.values(a).length !== Object.values(b).length) return false;
    // return true;
    for (let property in a) {
        if (a[property] !== b[property]) return false;
    }
    for (let property in b) {
        if (a[property] !== b[property]) return false;
    }
    return true;
}

console.log(equals(obj1, obj2));

