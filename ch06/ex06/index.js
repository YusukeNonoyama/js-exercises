// 継承するオブジェクト
let o1 = {x : 1, y : 2};
Object.defineProperty(o1, "enumerable", {
    value: "enumerable",
    writable: true,
    enumerable: true,
    configurable: true,
})
// プロパティの継承と独自プロパティの追加
let o2 = Object.create(o1);
o2.z = 3; 
o2["text"] = "text";
o2[10] = 10;

// 列挙不可な独自プロパティ
Object.defineProperty(o2, "unenumerable", {
    value: "unenumerable",
    writable: true,
    enumerable: false,
    configurable: true,
})

// Symbolの独自プロパティ
let s = Symbol("sym");
o2[s] = "symbol";

// console.log(o2); // 列挙可能な独自プロパティ： { '10': 10, z: 3, text: 'text', [Symbol(sym)]: 'symbol' }
// console.log(o2["unenumerable"]); // 列挙不可な独自プロパティ： unenumerable
// console.log(Object.getPrototypeOf(o2)); // 継承プロパティ： { x: 1, y: 2, enumerable: 'enumerable' }

// オブジェクトのすべての独自プロパティおよび列挙可能な継承プロパティのプロパティ名の配列を返す関数
export function showProperties(o){
    if (typeof o !== "object") return `invalid input: ${typeof o}`;
    if (o === null) return `invalid input: ${o}`;
    return [
        ...Object.getOwnPropertyNames(o),   // Symbol以外の全ての独自プロパティ（列挙不可含む）
        ...Object.getOwnPropertySymbols(o),     // 独自プロパティのSymbol
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(o)),    // Symbol以外の全ての継承プロパティ
    ]
}

console.log("============================================");
console.log(JSON.stringify(showProperties(o2)));
console.log(showProperties("string"));
console.log(showProperties(null));
