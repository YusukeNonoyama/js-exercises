function f() { throw new Error("") }

try {
    console.log("try");
    f();    // 必ずerrorを投げる関数
} catch (e) {
    console.log("catch");
} finally {
    console.log("finally");
}

// 実行コマンド：　node ch05/ex06
// 実行結果：
// try
// catch
// finally