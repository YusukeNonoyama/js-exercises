const obj1 = { x: 1 };
obj1["y"] = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 別のobjectのためfalseの予想　=> false
console.log(obj1 === obj2);


// equals()
export function equals(a, b) {
  // 厳密に一致
  if (a === b) return true;
  // object以外とnullはfalse
  if (typeof (a) !== "object" || typeof (b) !== "object") return false;
  if (a === null || b === null) return false;

  // プロパティの数が異なるとfalse
  if (Object.values(a).length !== Object.values(b).length) return false;

  // objectの中身が同一かどうかを再帰的に調べる
  for (let property in a) {
    if (typeof (a[property]) === "object") {
      return equals(a[property], b[property]);  // 最後のループのreturnがそのまま元の比較の結果
    } else if (a[property] !== b[property]) {
      return false;  // propertyが全て同じ値でないとfalseを返す
    }
  }
  return true;
}

console.log("1", equals(obj1, obj1));
console.log("2", equals(42, 42)); // true
console.log("3", equals(null, null)); // true

// 厳密等価ではない場合オブジェクト以外が指定されれば false
console.log("4", equals({ x: 42 }, 42)); // false
console.log("5", equals(null, { x: 42 })); // false

// プロパティの数・名前が一致しなければ false
console.log("6", equals({ x: 1 }, { y: 1 })); // false
console.log("7", equals({ x: 1 }, { x: 1, y: 1 })); // false

// プロパティの各値を equals で再帰的に比較
console.log("8", equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })); // true
console.log("9", equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })); // false
