export function calcExponentialRecursive(x: number, n: number): number {
    if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
        throw new Error("invalid input");
    }
    if (n === 0) return 1;
    return x * calcExponentialRecursive(x, n - 1);
}

export function calcExponentialLoop(x: number, n: number): number {
    if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
        throw new Error("invalid input");
    }
    let result = 1;
    while (n) {
        result *= x;
        n--;
    }
    return result;
}

// console.log(calcExponentialRecursive(2, 6));
// console.log(calcExponentialLoop(7, 19));