export function addMyCall(f: { myCall: Function, bind: Function }) {
    f.myCall = function (o: {}, ...args: [number]) {
        return f.bind(o)(...args);
    };
}

const f = function  () {
    return;
};

// addMyCall(f);
// console.log(f.myCall({a: 1}));
