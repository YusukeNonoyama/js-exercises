// 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
// 引数括弧： パラメータが一つでないため丸括弧は必要
// 戻り値括弧：　return文だけではないため中括弧は必要
export const showStringsRepeatedly = (n: number, c: string) => {
    if (!Number.isInteger(n)) {
        throw new Error(`should be an integer: ${n}`);
    }
    const a = [];
    for (let i = 0; i < n; i++) {
        console.log(c);
        a.push(c);
    }
    return a;
}

// 数値xを引数にとり、xの二乗の数値を返す
// 引数括弧： type指定のため丸括弧は必要（JSでは不要）
// 戻り値括弧： return文のみのため中括弧は不要
export const calcSquaredNumber = (x: number): number => x ** 2;

// 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
// 引数括弧： 引数がなしのアロー関数のため必要
// 戻り値括弧： 戻り値がオブジェクトリテラルのため、丸括弧の中にオブジェクトリテラルを記述
// return： 省略可
export const createObjectWithDate = () => ({ now: new Date() });
