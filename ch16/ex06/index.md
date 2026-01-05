## 問題
P.664 では fs.truncate() を利用してファイルを拡張した場合には拡張された部分には 0 が書き込まれる、と説明されていますが、これは ASCII の"0"が書き込まれるという意味ではありません。
実際に fs.truncate() を利用してファイルを拡張し、拡張されたファイルの内容をバイナリエディタ(Stirling や VSCode の HexEditor 拡張機能等)で確認しなさい。

## 解答
* テキストエディタで開いた場合
  ![alt text]({9E2BE48F-0F28-4E16-8A5D-3C2F5A9FDCAE}.png)
* HexEditorで開いた場合
  ![alt text]({67814360-9E2C-4C00-B92C-81D77ED6890D}.png)
  * `0x00` で埋められる（ヌル文字）。ASCIIの0は`0x30`のため異なる。

#### メモ
```
console.log(String.fromCharCode(0x30)); // "0"
console.log(String.fromCharCode(0x00)); // 何も表示されない
```