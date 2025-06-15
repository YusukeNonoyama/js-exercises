export function sum(array: number[]) {
  // 引数がarrayでないとreduceが呼び出せないため入力確認
  if (typeof array !== "object") return 0;
  // reduce()で和算
  return array.reduce((x, y) => x + y, 0);
}

export function join(array: (number | string)[], separator = ",") {
  // 入力配列が空の時、nullの時の挙動を定義
  if (array.length === 0) return "";
  if (separator === null) separator = "null";
  // arrayの中がnullの場合は空文字に置き換える。ループ前にやらないと要素がスキップされる。
  array = array.map(x => x === null ? "" : x);
  return array.reduce((x, y) => x + separator + y);
}

export function reverse(array: (number | string)[]) {
  return array.reduce((x, y) => [y, ...x], [] as (number | string)[]);
}

export function every(array: number[], callback: (y: number, index: number, a: number[]) => boolean) {
  return array.reduce((x, y, index, a) => {
    if (!x) return x;
    return callback(y, index, a);
  }, true);
}

export function some(array: number[], callback: (y: number, index: number, a: number[]) => boolean) {
  return array.reduce((x, y, index, a) => {
    if (x) return x;
    return callback(y, index, a);
  }, false);
}
