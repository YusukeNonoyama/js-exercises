export function assign(input: any, ...output: any){
    // inputがnullはエラー
    Object.keys(input);
    // NumberのWrapperオブジェクトを作成
    if (typeof input === "number") input = new Number(input);
    if (typeof input === "boolean") input = new Boolean(input);
    let result_o = input;
    for (let o of output){
        // Arrayのままだとlengthプロパティが入るのindexをプロパティにしたオブジェクトに変換
        if (Array.isArray(o)) o = Object.fromEntries(o.entries());  
        if (typeof o !== "object" || o === null) continue;
        // Symbol以外の独自プロパティを追加
        for (const p of Object.getOwnPropertyNames(o)){
            result_o[p] = o[p];
        }
        // Symbolのうち列挙可能なものみ追加
        for (const p of Object.getOwnPropertySymbols(o)){
            if (!o.propertyIsEnumerable(p)) continue;
            result_o[p] = o[p];
        }
    }
    return result_o;
}

// let input = { foo: "foo", hello: "world" }
// let output = [
//     { foo: "fooo", bar: "bar" },
//     { foo: "foooo", fizz: "fizz", buzz: "buzz" },
//     123,
// ]
// let input = { foo: "foo", hello: "world" };
// let output = [
//     123,
//     true,
//     ["aa", "bb", "cc"],
//     null,
//     undefined,
//   ];

// let input = 1
// let output = [{ foo: "foo", bar: "bar" }]

// let input = true
// let output = [{ foo: "foo", bar: "bar" }]

// let input = null
// let output = [{ foo: "foo", bar: "bar" }]


// console.log(assign(input, ...output));
// console.log(Object.assign(input, ...output));


// const arr = ["aa", "bb", "cc"];
// const oFromArray = Object.fromEntries(arr.entries())
// console.log(oFromArray);

// console.log(Object.getOwnPropertyNames(123));

// const n = new Number(1);  // wrapper object, not primitive
// n.foo = 'foo';
// n.bar = 'bar';

// console.log(n); // [Number: 1] { foo: 'foo', bar: 'bar' }

// Object.keys(undefined);