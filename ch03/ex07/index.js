export function equalArrays(a, b) {
    // メモ：　参照先が明らかに違う値になると参照が切れているのでここでtrueにするのは不可能に見える
    if (a === b) return true;                    // 同一の配列は等しい
    // length: メソッドを持つ型
    if (a.length !== b.length) return false;     // 長さが異なる配列は等しくない
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;         // 1つでも違っていれば等しくない
    }
    return true;                                // すべて同じであれば等しい
}

let empty = {}

console.log(equalArrays([1, 0], [1, -0]))
console.log(equalArrays([1, " "], [1, ` `]))
console.log(equalArrays([null], [undefined]))
console.log((empty === false))

const object_a = {x : 1};
const object_b = object_a;
object_b.x = 3;

console.log(object_a, object_b)