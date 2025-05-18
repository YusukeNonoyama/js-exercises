// // 再帰削減バージョン
export function calcExponentialRecursive(x: number, n: number): number {
    if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
        throw new Error("invalid input");
    }
    // n=0の場合
    if (n === 0) {
        return 1;
    }
    function multiplyAndCount(x: number, n: number, acc: number) {
        if (n === 1) {
            // カウントnが1になったらaccにxをかけて返す（accは余り分の積の値、xは累乗を再帰回数分繰り返した値）
            return acc * x;
        }
        if (n % 2 === 0) {
            // 奇数の場合はx→x*x, n→n/2として再帰回数を減らす
            return multiplyAndCount(x * x, Math.floor(n / 2), acc);
        } else {
            // 偶数の場合は奇数と同様にした上で、余りの１回分をacc*xとして返す
            return multiplyAndCount(x * x, Math.floor(n / 2), acc * x);
        }
    }
    // accにxを１回掛けたらカウントnを減らす末尾再帰関数
    return multiplyAndCount(x, n, 1);
}




// ループ削減バージョン
export function calcExponentialLoop(x: number, n: number): number {
    if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
        throw new Error("invalid input");
    }
    let acc = 1;
    if (n === 0) {
        return 1;
    }
    while (n > 1) {
        if (n % 2 !== 0) {
            acc *= x;
        }
        x = x * x;
        n = Math.floor(n / 2);
    }
    return x * acc;
}

// // 再帰シンプルバージョン
// export function calcExponentialRecursive(x: number, n: number): number {
//     if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
//         throw new Error("invalid input");
//     }
//     return multiplyAndCount(x, n, 1);
// }

// function multiplyAndCount(x: number, n: number, acc: number) {
//     if (n === 0) {
//         return acc;
//     }
//     return multiplyAndCount(x, n - 1, acc * x);
// }

// シンプルバージョン
// export function calcExponentialLoop(x: number, n: number): number {
//     if (!Number.isFinite(x) || !Number.isInteger(n) || n < 0) {
//         throw new Error("invalid input");
//     }
//     let result = 1;
//     while (n) {
//         result *= x;
//         n--;
//     }
//     return result;
// }

// console.log(calcExponentialRecursive(2, 6));
// console.log(calcExponentialLoop(2, 6));