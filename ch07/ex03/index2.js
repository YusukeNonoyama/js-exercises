export function join(array, separator = ",") {
    // 入力配列が空の時、nullの時の挙動を定義
    if (array.length === 0) return "";
    if (separator === null) separator = "null";

    // arrayの中がnullの場合は空文字に置き換える。ループ前にやらないと要素がスキップされる。
    // array = array.map(x => x === null ? "" : x);

    return array.reduce((x, y) => {
        // if(!x) return "";
        y = y === null ? "" : y;
        console.log(x + separator + y);
        return x + separator + y;
    }, "");
}

join([1, null, 3])