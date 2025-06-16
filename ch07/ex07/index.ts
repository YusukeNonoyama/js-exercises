// バブルソート
export function bubbleSort(arr: number[]) {
    if(!Array.isArray(arr)) {
        throw Error(`invalid input: ${arr}`)
    }
    if(!arr.every(x => typeof x === "number")){
        throw Error(`invalid array element: ${arr}`)
    }
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