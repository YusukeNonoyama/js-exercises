import defalutFunction from "./module.ts" // defaultのインポート
import { fooRenamed2 as fooRenamed , BarRenamed} from "./module.ts" // 名前変更を伴うインポート
import {a, b} from "./modules.ts"   // 再エクスポートしたファイルを参照

console.log(defalutFunction());
console.log(fooRenamed());
console.log(new BarRenamed().bazReanamed());
console.log(a());
console.log(b());

// Arrow function from models.ts
// Function foo() from module.ts
// Bar class method baz() from module.ts
// Function a() from moduleA.ts
// Function b() from moduleB.ts