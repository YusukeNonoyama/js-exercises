export function abs(x) {
  // 絶対値を計算する関数
  if (x >= 0) {
    // if文は比較がtrue の場合にこのコードを実行する
    return x;
  } else {
    // ここでif 節が終わる 省略可能なelse節は比較がfalse のときに実行される
    return -x;
  } // 節に1文しかない場合は中括弧は省略できる
} // return文はif else中に含まれていることに注意

export function sum(array) {
  // 配列の要素の合計を計算する
  let sum = 0; // sumの初期値を0にする
  for (let x of array) {
    // 配列をループし各要素をxに代入する
    sum += x; // sumに各要素の値を加算する
  } // ここでループが終わる
  return sum; // sumを返す
}

export function factorial(n) {
  // 階乗を計算する関数
  let product = 1; // 1からスタート
  while (n > 1) {
    // ()中の式がtrueの間は{}中の文を繰り返す
    product *= n; // product = product * n; の短縮表記
    n--; // n = n - 1 の短縮表記
  } // ループの最後
  return product; // 計算結果を返す
}
