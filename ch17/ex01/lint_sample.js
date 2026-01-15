// Mathライブラリをインポート
import { PI, cos, sin } from "Math";

let a, x, y;
const r = 10;

// withコンテキストを削除
// with (Math) {
a = PI * r * r;
x = r * cos(PI);
y = r * sin(PI / 2);
// }

console.log(a, x, y);
