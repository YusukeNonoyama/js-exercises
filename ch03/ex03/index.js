export function isSameValue(x, y) {
    x = x.toFixed(10);
    y = y.toFixed(10);
    console.log(x);
    return x === y;
}
  
console.log(isSameValue(0.3 - 0.2, 0.1));