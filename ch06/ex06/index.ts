// オブジェクトのすべての独自プロパティおよび列挙可能な継承プロパティのプロパティ名の配列を返す関数
export function showProperties(o: {}) {
  if (typeof o !== "object") {
    throw new Error(`invalid input: ${o}`);
  }
  if (o === null) {
    throw new Error(`invalid input: ${o}`);
  }
  return [
    ...Object.getOwnPropertyNames(o), // Symbol以外の全ての独自プロパティ（列挙不可含む）
    ...Object.getOwnPropertySymbols(o), // 独自プロパティのSymbol
    // ...Object.getOwnPropertyNames(Object.getPrototypeOf(o)),    // Symbol以外の全ての継承プロパティ
    ...Object.keys(Object.getPrototypeOf(o)), //
  ];
}

// 平山さん回答
export function getALlPropertyKeys(obj: {}) {
  const ownKyes = [
    ...Object.getOwnPropertyNames(obj), // 独自プロパティの名前
    ...Object.getOwnPropertySymbols(obj), // 独自プロパティのSymbol
  ];

  const inheritedEnumerableKeys: any[] = [];
  let proto = Object.getPrototypeOf(obj);

  while (proto && proto !== Object.prototype) {
    for (let key of Object.keys(proto)) {
      /// Object.keys()は列挙可能なプロパティのみを取得
      if (!obj.hasOwnProperty(key) && !inheritedEnumerableKeys.includes(key)) {
        inheritedEnumerableKeys.push(key);
      }
    }
    proto = Object.getPrototypeOf(proto); // プロトタイプチェーンをたどる
  }
  return [...ownKyes, ...inheritedEnumerableKeys];
}

let o1 = { x: 1, y: 2 };
Object.defineProperty(o1, "enumerable", {
  value: "enumerable",
  writable: true,
  enumerable: true,
  configurable: true,
});
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
});
// Symbolの独自プロパティ
let s = Symbol("sym");
o2[s] = "symbol";

let o3 = Object.create(o2);
o3.k = "new property";

console.log(getALlPropertyKeys(o2));
console.log(showProperties(o2));

console.log(getALlPropertyKeys(o3)); // プロトタイプチェーンを最後まで辿れる
console.log(showProperties(o3)); // こっちだと１つ下層だけしかプロトタイプを辿れないcccc
