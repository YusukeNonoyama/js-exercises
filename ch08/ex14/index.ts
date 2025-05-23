// any 関数
export function any(...args: Function[]) {
    return (a: number) => {
        for (let f of args) {
            if (f(a)) {
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
            return f(a);
        } catch(e) {
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