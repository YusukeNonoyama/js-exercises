
export function pop(arr: number[]) {
    return arr.slice(0, -1);
}

export function push(arr: number[], value: number) {
    return [...arr, value];
}

export function shift(arr: number[]) {
    return arr.slice(1);
}

export function unshift(arr: number[], value: number) {
    return [value, ...arr];
}

export function sort(arr: number[], callback: (a: number, b: number) => number) {
    return [...arr].sort(callback);
}
