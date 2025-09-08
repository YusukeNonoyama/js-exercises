export function assign(input: any, ...output: any) {
  if (input === null || input === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  // Wrapperオブジェクトを作成
  // Number {..}, Boolean{..}という形式（assign()が期待する返り値）
  if (typeof input === "number") {
    input = new Number(input);
  }
  if (typeof input === "boolean") {
    input = new Boolean(input);
  }
  let result_o = input;
  for (let o of output) {
    // Arrayのままだとlengthプロパティが入るのindexをプロパティにしたオブジェクトに変換
    if (Array.isArray(o)) {
      o = Object.fromEntries(o.entries());
    }
    if (typeof o !== "object" || o === null) continue;
    // Symbol以外の独自プロパティを追加
    for (const p of Object.getOwnPropertyNames(o)) {
      result_o[p] = o[p];
    }
    // Symbolのうち列挙可能なものみ追加
    for (const p of Object.getOwnPropertySymbols(o)) {
      if (!o.propertyIsEnumerable(p)) continue;
      result_o[p] = o[p];
    }
  }
  return result_o;
}
