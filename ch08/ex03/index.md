## 末尾再帰はなぜ最適化ができるのか

- 末尾再帰の場合は、中間の関数は次の再帰関数を呼び出した時点で処理が終了するため、スタックフレームを残さずに上書きをするという処理ができる。このため再帰の回数がどんなに深くてもスタックフレームが積みあがることはなく動作を軽くすることができる（最適化）。

## JavaScript で末尾再帰最適化を実装している処理系（Tail Call Optimization, TCO）

- Safari (JavaScriptCore)
  - ES6の末尾最適化を実装。非 strict モードでは無効
  - iPhoneのSafariで実行できた
    - `Executed transpiled Typescript` がポップアップ表示
    - `[LOG]: Infinity`
- Chromeではエラー

```
[ERR]: "Executed JavaScript Failed:"
[ERR]: Maximum call stack size exceeded
```
