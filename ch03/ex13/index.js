export function eq(a, b) {
  // 型も値も同じものをtrue判定
  if (a === b) return true;

  // Dateオブジェクトのケースを判定(文字列->数値の変換前に配置)
  if (a instanceof Date) a = a + "";
  if (b instanceof Date) b = b + "";
  if (a === b) return true;

  // 文字列を数値変換後にtrue判定
  if (typeof a === "string") a = Number(a);
  if (typeof b === "string") b = Number(b);
  if (a === b) return true;

  // 論理を数値変換後にtrue判定
  if (typeof a === "boolean") a = Number(a);
  if (typeof b === "boolean") b = Number(b);
  if (a === b) return true;

  // nullとundefinedは等しいと判定されるためundefinedに統一して判定。nullだとtypeofで"object"が返るからだめ
  if (a === null) a = undefined;
  if (b === null) b = undefined;
  if (a === b) return true;

  // 片方がオブジェクトで片方が数値の場合
  if (typeof a === "object" && typeof b === "number") [a, b] = [b, a]; // bがobjectになるようにスワップ
  if (typeof a === "number" && typeof b === "object") b = Number(b); // bを数値型へ変換
  if (a === b) return true;

  // 片方がfunctionで片方が数値の場合
  if (typeof a === "function" && typeof b === "number") [a, b] = [b, a]; // bがfunctionになるようにスワップ
  if (typeof a === "number" && typeof b === "function") b = Number(b); // bを数値型へ変換
  if (a === b) return true;

  return false;
}

export function lte(a, b) {
  // 型が同じものを判定
  if (typeof a === typeof b) {
    if (a === b) return true;
    if (a < b) return true;
  }

  // 論理を数値変換後に判定
  if (typeof a === "boolean") a = Number(a);
  if (typeof b === "boolean") b = Number(b);
  if (a === b) return true;
  if (a < b) return true;

  // objectを数値型に変換
  if (typeof a === "object" && typeof b === "number") a = Number(a);
  if (typeof a === "number" && typeof b === "object") b = Number(b);
  if (a === b) return true;
  if (a < b) return true;

  // functionを数値型に変換
  if (typeof a === "function" && typeof b === "number") a = Number(a);
  if (typeof a === "number" && typeof b === "function") b = Number(b);
  if (a === b) return true;
  if (a < b) return true;

  return false;
}
