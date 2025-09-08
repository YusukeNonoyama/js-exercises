let o: { [i: string]: number } = {};

Object.defineProperty(o, "unwritable", {
  value: 1,
  writable: false, // writableだけfalse
  enumerable: true,
  configurable: true,
});

Object.defineProperty(o, "unenumerable", {
  value: 2,
  writable: true,
  enumerable: false, // enumerableだけfalse
  configurable: true,
});

Object.defineProperty(o, "unconfigurable", {
  value: 3,
  writable: true,
  enumerable: true,
  configurable: false, // configurableだけfalse
});

o.normal = 4; // 普通のプロパティ

console.log(o.unwritable); // => 1
console.log(o.unenumerable); // => 2
console.log(o.unconfigurable); // => 3
console.log(o.normal); // => 4

// プロパティの変更、削除、hasOwnProperty と propertyIsEnumerable
function unwritableProperty() {
  o.unwritable = 100; // => エラー： TypeError: Cannot assign to read only property 'unwritable' of object '#<Object>'
  console.log(o.unwritable); // => 検証不可
  console.log(o.hasOwnProperty("unwritable")); // => true
  console.log(o.propertyIsEnumerable("unwritable")); // => true
  delete o.unwritable; // 削除可能
  console.log(o.unwritable); // => undefined
}

function unenumerableProperty() {
  o.unenumerable = 100; // 代入可能
  console.log(o.unenumerable); // => 100
  console.log(o.hasOwnProperty("unenumerable")); // => true
  console.log(o.propertyIsEnumerable("unenumerable")); // => false
  delete o.unenumerable; // 削除可能
  console.log(o.unenumerable); // => undefined
}

function unconfigurableProperty() {
  o.unconfigurable = 100; // 代入可能
  console.log(o.unconfigurable); // => 100
  console.log(o.hasOwnProperty("unconfigurable")); // => true
  console.log(o.propertyIsEnumerable("unconfigurable")); // => true
  delete o.unconfigurable; // => エラー： TypeError: Cannot delete property 'unconfigurable' of #<Object
  console.log(o.unconfigurable); // => 検証不可
}

function normalProperty() {
  o.normal = 100; // 代入可能
  console.log(o.normal); // => 100
  console.log(o.hasOwnProperty("normal")); // => true
  console.log(o.propertyIsEnumerable("normal")); // => true
  delete o.normal; // => エラー： TypeError: Cannot delete property 'unconfigurable' of #<Object>
}

// unwritableProperty();   // 代入はできないが削除はできる
// unenumerableProperty(); // 代入も削除もできる、
// unconfigurableProperty();   // 代入はできるが削除はできない
// normalProperty();   // 代入も削除もできる

// プロパティの巡回
for (const p in o) {
  console.log(p);
}

// 結果は両方同じ：
// unwritable
// unconfigurable
// normal
// => unenumerableのみ出力されない
