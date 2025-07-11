// any 関数
export function any(...functions: ((x: number) => boolean)[]) {
    return (arg: number) => {
        for (let f of functions) {
            if (f(arg)) {
                return true;
            }
        };
        return false;
    }
}

// catching 関数
export function catching(f: Function, g: Function) {
    return (a: string) => {
        try {
            // エラーが発生しなければそのまま返す
            return f(a);
        } catch (e) {
            // エラーを引数にして結果を返す
            return g(e);
        }
    }
}

// const safeJsonParse = catching(JSON.parse, (e:Error) => {
//   return { error: e.toString() };
// });

// console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
// console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}



// const isNonZero = any(
//     (n: number) => n > 0,
//     (n: number) => n < 0
// );

// console.log(isNonZero(0)); // => false
// console.log(isNonZero(42)); // => true
// console.log(isNonZero(-0.5)); // => true

// function not(f){
//     return function(...args){
//         let result = f.apply(this, args);
//         return !result;
//     }
// }