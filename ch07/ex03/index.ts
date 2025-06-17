export function sum(array: number[]) {
  if (!Array.isArray(array)) return 0;
  return array.reduce((x, y) => x + y, 0);
}

export function join(array: (number | string)[], separator = ",") {
  if (array.length === 0) return "";
  if (separator === null) separator = "null";
  // arrayの中がnullの場合は空文字に置き換える
  array = array.map(x => x === null ? "" : x);
  return array.reduce((x, y) => x + separator + y);
}

export function reverse(array: (number | string)[]) {
  return array.reduce((x, y) => [y, ...x], [] as (number | string)[]);
}

// 全ての配列要素がtrueならtrueを返す、１つでもfalseがあればfalseを返す
export function every(array: number[], callback: (y: number, index: number, a: number[]) => boolean) {
  return array.reduce((x, y, index, a) => {
    // xがfalseならfalseを返して終了
    if (!x) return false;
    // xがtrueならcallbackでyを評価。「結果がfalseなら次のxがfalseになり終了、結果がtrueなら次のyを評価」を繰り返す
    // テストケースの引数１つと３つの場合に両方対応したcallback
    return callback(y, index, a);
  }, true);
}

// 全ての配列要素がfalseならfalseを返す、1つでもtrueがあればtrueを返す
export function some(array: number[], callback: (y: number, index: number, a: number[]) => boolean) {
  return array.reduce((x, y, index, a) => {
    if (x) return true;
    return callback(y, index, a);
  }, false);
}
