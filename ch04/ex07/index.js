// `const geval = eval;`を加えた。定義した変数をグローバル変数にするため
function set42(key) {
    const geval = eval;
    geval(`${key} = 42;`);  // varがなくてもエラー出ないのはなぜ？
}

// ずっとiに42を代入し続ける
set42("while (true) i");

// グローバルオブジェクトを出力する
set42("console.log(globalThis); i");
