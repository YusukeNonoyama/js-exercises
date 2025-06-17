/////////////////////////////////////////////////////////////////////////////////////////////////
function fizzbuzz(n: number) {
    const output = new Array(n);
    output.fill(0); // 要素がemptyだとループできないので0で埋める
    output.forEach((_, i, a) => a[i] = i + 1);  // ループして1～nまでの要素の配列にする

    // Fizz, Buzz, Fizzbuzzのそれぞれのケースになるindexの配列を抽出する
    const fizzIndex = output.filter(x => x % 3 === 0);
    const buzzIndex = output.filter(x => x % 5 === 0);
    const fizzbuzzIndex = output.filter(x => x % 15 === 0);

    // それぞれを部分配列から、元の配列へ文字列を代入する。FizzBuzzは最後。
    fizzIndex.forEach(v => { output[v - 1] = "Fizz" });
    buzzIndex.forEach(v => { output[v - 1] = "Buzz" });
    fizzbuzzIndex.forEach(v => { output[v - 1] = "FizzBuzz" });

    output.forEach(v => console.log(v));
}

fizzbuzz(20);
// 結果：
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19
// Buzz

/////////////////////////////////////////////////////////////////////////////////////////////////
function sumOfSquaredDifference(f: number[], g: number[]) {
    let result = 0;
    f.map((_, i) => result += (f[i] - g[i]) ** 2); // 全ての要素で差分の２乗をresultに加える
    return result;
}

const arrayA = [1, 2, 3, 4];
const arrayB = [2, 2, 3, 6];

const result1 = sumOfSquaredDifference(arrayA, arrayB);
console.log(result1);

// 結果：
// 5

/////////////////////////////////////////////////////////////////////////////////////////////////
function sumOfEvensIsLargerThan42(array: number[]) {
    let sum = 0;
    const evenNumbers = array.filter(v => v % 2 === 0);  // 偶数の値を持つ要素を抽出
    evenNumbers.forEach(v => sum += v); // sumに加える
    return sum >= 42;
}

let arrayC = [2, 40];

const result2 = sumOfEvensIsLargerThan42(arrayC);
console.log(result2);

// 結果：
// true