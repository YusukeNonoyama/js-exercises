## CommonJS
* 関数foo() => インポート先のインポートオブジェクトのキー名として反映された `const { fooRenamed: foo, Bar } = require("./module.cjs");`
* クラス => 追従しない。そのまま実行するとエラーになった。
* メソッドbaz() => インポートしたファイルのコード中の名前も変更された

## ES6
* 関数foo()名前変更を伴うインポート => インポート先のインポートオブジェクトの名称が変更された。インポート先で使われる関数名称は変更されない。 `import { fooRenamed2 as fooRenamed , Bar} from "./module.ts"`
* クラス => インポートしたファイルのコード中の名前も変更された。CommonJSと異なる挙動。
* メソッドbaz() => インポートしたファイルのコード中の名前も変更された
* default export => 関数名を変更してもインポート先へは反映されないが動作は正常。default exportは１つのentityだけなので名前は関係ない。
* 再エクスポート => 再エクスポートしているファイルで以下のようになり動作は正常。インポート先の関数名へは影響しない。 `export {aRenamed as a} from "./modules/moduleA.ts"`

## Rename方法
* VSCodeではF2でRenameできる