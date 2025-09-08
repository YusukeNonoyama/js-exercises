## 実行結果の予想

- importは１度しか実行されない。インポート先のコードの順序通りに出力される。

## 実行結果

- importは１度しか実行されず、他のコードよりも先に実行される。
- 実行スクリプト

```
console.log("lineA");
import "./module.js";
console.log("lineB");
import "./module.js";
console.log("lineC");
```

- 出力

```
This line is from module.js.
lineA
lineB
lineC
```
