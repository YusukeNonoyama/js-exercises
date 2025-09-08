## グローバルオブジェクトを参照する方法

- ブラウザ内: "window"
- node内: "global"
- ブラウザnode問わず: "globalThis"

## ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記す

- alert()
- blur()
- caches
- cancelAnimationFrame()
- close()
- cookieStore()
- createImageBitmap()
- credentialless
- fetchLater()
- getSelection()

## グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記す

3563行目に定義されている。
ES3以前の仕様では undefined の値が書き換え可能だったために、上書きされて意図通りに動かなくなる問題があった。現在では undefined プロパティは undefined に設定されて、書き込み不可、再定義負荷になっている。

// 確認コードコード
console.log(Object.getOwnPropertyDescriptor(window, "undefined"));
// 結果

```
{value: undefined, writable: false, enumerable: false, configurable: false}
```
