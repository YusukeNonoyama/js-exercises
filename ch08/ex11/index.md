## 自作関数
* コード
```
function checkToString(){
    return "function to check result of applying toString() method"
}

console.log(checkToString.toString());
```
* 出力
```
function checkToString() {
    return "function to check result of applying toString() method";
}
```

## 組み込み関数
* コード
```
console.log(console.log.toString());
```
* 出力
```
function () { [native code] }
```
