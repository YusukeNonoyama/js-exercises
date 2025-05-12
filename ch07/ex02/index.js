/////////////////////////////////////////////////////////////////////////////////////////////////
function fizzbuzz(n) {

    let output = new Array(n);
    output.fill(0); // 要素がemptyだとループできないので0で埋める
    output.forEach((_, i, a) => a[i] = i + 1);  // ループして1～nまでの要素の配列にする
    
    // Fizz, Buzz, Fizzbuzzのそれぞれのケースになるindexの配列を抽出する
    let fizz_index = [], buzz_index = [], fizzbuzz_index = [];
    fizz_index = output.filter(x => x%3 === 0);
    buzz_index = output.filter(x => x%5 === 0);
    fizzbuzz_index = output.filter(x => x%15 === 0);

    // それぞれを部分配列から、元の配列へ文字列を代入する。FizzBuzzは最後。
    fizz_index.forEach(v => {output[v-1] = "Fizz"});
    buzz_index.forEach(v => {output[v-1] = "Buzz"});
    fizzbuzz_index.forEach(v => {output[v-1] = "FizzBuzz"});

    output.forEach(v => console.log(v));
}

// fizzbuzz(20);


/////////////////////////////////////////////////////////////////////////////////////////////////
function sumOfSquaredDifference(f, g) {
    let result = 0;
    f.map((_, i) => result += (f[i] - g[i]) ** 2 ); // 全ての要素で差分の２乗をresultに加える
    return result;
}

// let array_a = [1, 2, 3, 4];
// let array_b = [2, 2, 3, 6];

// const result = sumOfSquaredDifference(array_a, array_b);
// console.log(result);


/////////////////////////////////////////////////////////////////////////////////////////////////
function sumOfEvensIsLargerThan42(array) {
    let sum = 0;
    let evenNumbers = [];
    evenNumbers = array.filter(v => v%2 === 0);  // 偶数の値を持つ要素を抽出
    evenNumbers.forEach(v => sum += v); // sumに加える
    return sum >= 42;
}


// let array_c = [2, 40];

// const result = sumOfEvensIsLargerThan42(array_c);
// console.log(result);




