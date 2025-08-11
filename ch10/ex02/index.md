### CommonJS と ES Module 以外の JavaScript のモジュール方式名
* IIFE（Immediately Invoked Function Expression）モジュール
  * モジュールシステムがなかった時代の擬似モジュール化。即時実行関数スコープを使ってグローバル汚染を防止。
* AMD (Asynchronous Module Definition)
  * クライアントサイドでモジュール形式を使えるようにした。非同期にモジュールを読み込む。
* UMD (Universal Module Definition)
  * ライブラリをどんな環境（CommonJS, AMD, グローバル）でも使えるようにする。AMD / CommonJS / グローバルスコープ すべてに対応するためのラッパー。
