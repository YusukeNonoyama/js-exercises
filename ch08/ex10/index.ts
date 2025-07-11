export function addMyCall(f: { myCall: Function, bind: Function }) {
    f.myCall = function (o: { a: number }, ...args: number[]) {
        return f.bind(o)(...args);
    };
}


// const f = function  () {
//     return;
// };

// addMyCall(f);
// console.log(f.myCall({a: 1}));
// let g = function () {
//     return this.x;
// }
// const o = { x: 100 };
// console.log(g.call(o));