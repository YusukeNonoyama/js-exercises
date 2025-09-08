## 組み込み関数

- コード

```
console.log(console.log.toString());
```

- 出力
  テキストの通り関数本体が[native code]となる出力

```
function () { [native code] }
```

## 自作関数

- コード

```
function checkToString(){
    return "function to check result of applying toString() method"
}

console.log(checkToString.toString());
```

- 出力
  テキストの通り関数宣言文の文字列を返す

```
function checkToString() {
    return "function to check result of toString() method";
}
```
