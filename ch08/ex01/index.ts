// 引数括弧： パラメータが一つでないため丸括弧は必要
// 戻り値括弧：　return文だけではないため中括弧は必要
export const showStringsRepeatedly = (n: number, c: string) => {
    const a = [];
    for ( let i = 0; i < n; i++) {
        console.log(c);
        a.push(c);
    }
    return a;
}

// 引数括弧： type指定のため丸括弧は必要（JSでは不要）
// 戻り値括弧： return文のみのため中括弧は不要
export const calcSquaredNumber = (x: number) :number => x ** 2;

// 引数括弧： 引数がなしのアロー関数のため必要
// 戻り値括弧： 戻り値がオブジェクトリテラルのため、丸括弧の中にオブジェクトリテラルを記述
// return： 省略可
export const createObjectWithDate = () => ({now: new Date()});

console.log(showStringsRepeatedly(10, "hi"));
console.log(calcSquaredNumber(5));
console.log(createObjectWithDate());