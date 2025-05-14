// バブルソート
export function bubbleSort(arr) {
    if(!Array.isArray(arr)) return "invalid input";
    if(!arr.every(x => typeof x === "number")) return "invalid array element";

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        // n-1-i番目以降はソート済みなので、未ソート箇所を対象に繰り返す
        for (let j = 0; j < n - 1 - i; j++) {
            // 隣の要素と比べて左辺が大きい場合は、配列の右側へ順次スワップされていく
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return [...arr];
}

const a = [8, 4, 7, 2, 1, 3, 5, 6, 9, 10, 5];
const b = [8, 4, 7, 2, 1, 3, 5, 6, 9, "b", 5];
console.log(a);
bubbleSort(a);
console.log(a);

console.log(b.every(x => typeof x === "number"));

// function sort(
//   array,
//   compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
// ) {
//   // array[0 ... i-1] が常にソート済みになるように処理を進める
//   // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
//   for (let i = 1; i < array.length; i++) {
//     const v = array[i];

//     // array[i] を array[0 ... i] の適切な場所に挿入する
//     let j = i;
//     while (j > 0 && compare(array[j - 1], v) > 0) {
//       array[j] = array[j - 1];
//       j--;
//     }
//     array[j] = v;
//   }
//   return array;
// }

// let a = [2, 4, 5, 1, 6, 2];

// console.log(sort(a));