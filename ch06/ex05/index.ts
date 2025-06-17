let o1: {[i: string]: number|string} = {};

Object.defineProperty(o1, "enumerable", {
    value: "enumerable",
    writable: true,
    enumerable: true,    // 列挙可能
    configurable: true,
})
o1["text"] = "text";
o1[10] = 10;

console.log(o1);

console.log("==============================")
for(const p in o1){
    console.log(p);
}
// 順番の結果： 10 => (enumerable or text)
// enumerableとtextは追加した順番で入れ替わる

// 10
// enumerable
// text

console.log("==============================")

let o2: {[i: string]: number|string}  = Object.create(o1);
// o2.x = 5;
o2[10] = 1000;
o2[11] = 1001;
o2["text"] = "inherited_text";
o2["text2"] = "text2";

// console.log(o2["enumerable"]);

Object.defineProperty(o2, "enumerable", {
    value: "unenumerable",
    writable:true,
    enumerable: false,  // 列挙不可
    configurable: true,
})

for(const p in o2){
    console.log(p, ":", o2[p]);
}

// console.log(o2["enumerable"]);

// 順番の結果： (10 or 11) => text => text2
// ※数値プロパティはの数値の大きさで順番が変わる
// ※enumerableはforループで出力されない。列挙不可に上書きされたと考えられる。
// ※継承した文字列プロパティの方が先に出力される。アルファベット順問わず。

// 10 : 1000
// 11 : 1001
// text : inherited_text
// text2 : text2