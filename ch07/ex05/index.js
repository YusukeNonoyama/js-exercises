
export function pop(arr){
    return arr.slice(0, -1);
}

export function push(arr, value){
    return [...arr, value];
}

export function shift(arr){
    return arr.slice(1);
}

export function unshift(arr, value){
    return [value, ...arr];    
}

export function sort(arr, callback){
    return [...arr].sort(callback);
}

const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
// console.log(seq); // [1, 2, 3, 4, 5]
