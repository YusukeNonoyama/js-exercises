export function addMyCall(f) {
  f.myCall = function(o, ...args) {
    return f.bind(o)(...args);
  };
}

const f = function  () {
    return;
};

addMyCall(f);
console.log(f.myCall({a: 1}));