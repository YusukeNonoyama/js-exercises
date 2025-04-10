export function equalArrays(a, b) {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  


// export function equalArrays(a, b) {
//     // メモ：　参照先が明らかに違う値になると参照が切れているのでここでtrueにするのは不可能に見える
//     if (a === b) return true;                    // 同一の配列は等しい
//     // length: メソッドを持つ型
//     if (a.length !== b.length) return false;     // 長さが異なる配列は等しくない
//     for (let i = 0; i < a.length; i++) {
//         if (a[i] !== b[i]) return false;         // 1つでも違っていれば等しくない
//     }
//     return true;                                // すべて同じであれば等しい
// }

// console.log(equalArrays(8, 888))    // 数値に.lengthは定義されていないからundefinedが返る
// console.log(equalArrays(true, false))    // 論理型に.lengthは定義されていないからundefinedが返る
// console.log(equalArrays({x: 2}, {x: 888, y: 8888}))    // オブジェクトに.lengthは定義されていないからundefinedが返る
// console.log(equalArrays(8, {x: 888, y: 8888}))
// console.log(equalArrays(true, {x: 2}))
// console.log(equalArrays([1, 0], [1, -0]))   // 明らかに違う値ではないけど一応
// console.log(equalArrays([1, " "], [1, ` `]))    // 明らかに違う値ではないけど一応
