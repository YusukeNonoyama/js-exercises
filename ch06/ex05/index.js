let o1 = {};

Object.defineProperty(o1, "enumerable", {
    value: "enumerable",
    writable: true,
    enumerable: true,    // enumerableだけtrue
    configurable: false,
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

console.log("==============================")

let o2 = Object.create(o1);
// o2.x = 5;
o2[10] = 1000;
o2[11] = 1001;
o2["text"] = "inherited_text";
o2["textO2"] = "textO2";

console.log(o2["enumerable"]);

Object.defineProperty(o2, "enumerable", {
    x: "unenumerable",
    writable:true,
    enumerable: false,  // 同名にするため名前と異なるが列挙不可
    configurable: false,
})

for(const p in o2){
    console.log(p, ":", o2[p]);
}

console.log(o2["enumerable"]);

// 順番の結果： (10 or 11) => text => textO2
// ※数値プロパティはの数値の大きさで順番が変わる
// ※enumerableはforループで出力されない。しかしプロパティで直接アクセスしても出力されない（なぜ？）。writableがtrue/falseどちらも同様。
// ※継承した文字列プロパティの方が先に出力される。アルファベット順問わず。