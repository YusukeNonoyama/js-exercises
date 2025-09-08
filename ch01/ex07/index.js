export class Point {
  // クラス名は大文字から記述するのが慣習
  constructor(x, y) {
    // 新しいインスタンスを初期化するコンストラクタ関数
    this.x = x; // thisキーワードで初期化中のオブジェクトを参照できる
    this.y = y; // 関数の引数をオブジェクトのプロパティとして保存する
  } // return文は必要ない

  add(x, y) {
    this.x += x;
    this.y += y;
  }
}
