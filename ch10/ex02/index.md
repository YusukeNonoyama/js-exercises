### CommonJS と ES Module 以外の JavaScript のモジュール方式名
* AMD (Asynchronous Module Definition)
  * 用途: 主にブラウザ向け（特にCommonJSが使えなかった時代）
  * 特徴: 非同期にモジュールを読み込む（クライアント環境向け）
* UMD (Universal Module Definition)
  * 用途: ライブラリをどんな環境（CommonJS, AMD, グローバル）でも使えるようにする
  * 特徴: AMD / CommonJS / グローバルスコープ すべてに対応するためのラッパー
* SystemJS
  * 用途: ブラウザ向けの柔軟なモジュールローダー
  * 特徴: 複数のモジュール形式（ESM, AMD, CommonJSなど）を動的にロードできる
* IIFE（Immediately Invoked Function Expression）モジュール
  * 用途: モジュールシステムがなかった時代の擬似モジュール化
  * 特徴: 関数スコープを使ってグローバル汚染を防止
* Native Global Module Pattern（グローバルスコープ）
  * 用途: 非推奨。モジュールが使えなかった時代の単純な方法。
  * 特徴: すべてがグローバル変数になるため、名前衝突のリスクが高い