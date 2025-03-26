export function is_same_value(x, y) {
    x = x.toFixed(10);
    y = y.toFixed(10);
    console.log(x);
    return x === y;
}
  
console.log(is_same_value(0.3 - 0.2, 0.1));