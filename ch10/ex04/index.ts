import arrowFunction from "./module.ts"; // defaultのインポート（関数名がなくてもエクスポートできる）
import { foo as fooRenamed, Bar } from "./module.ts"; // 名前変更を伴うインポート
import { a, b } from "./modules.ts"; // 再エクスポートしたファイルを参照

console.log(arrowFunction());
console.log(fooRenamed());
console.log(new Bar().baz());
console.log(a());
console.log(b());

// 結果：
// Arrow function from models.ts
// Function foo() from module.ts
// Bar class method baz() from module.ts
// Function a() from moduleA.ts
// Function b() from moduleB.ts
