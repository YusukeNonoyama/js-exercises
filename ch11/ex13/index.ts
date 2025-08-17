export function stringifyJSON(input: any[] | {}) {
  // エスケープシーケンスを文字列に置き換える関数
  function addEscapeSequence(input: string) {
    input = input.replace(/\\/g, "\\\\"); // これを始めにやらないと途中で増えたbackslashをさらに増やしてしまう
    input = input.replace(/\n/g, "\\n");
    input = input.replace(/\t/g, "\\t");
    input = input.replace(/\f/g, "\\f");
    input = input.replace(/\r/g, "\\r");
    input = input.replace(/\x08/g, "\\b");  // /\b/g だとword boundaryにマッチしてしまう。backspace charactorとマッチうsるためにASCII codeの\x08を使う。
    input = input.replace(/\u0000/g, "\\u0000");
    input = input.replace(/\u000A/g, "\\u000A");
    input = input.replace(/\u0012/g, "\\u0012");
    input = input.replace(/\u0000/g, "\\u0000");
    input = input.replace(/\u0022/g, '\\"');  // ' " '
    return input;
  }
  // 対象がvalueかarrayかobjectかを判定して必要なら括弧を加える関数
  function addBrackets(input: any[] | {} | undefined, valueStr: string) {
    if (Array.isArray(input)) {
      valueStr = ["[", valueStr, "]"].join("");
    } else if (typeof input === "object") {
      valueStr = ["{", valueStr, "}"].join("");
    }
    return valueStr;
  }
  let resultStr = "";
  if (Array.isArray(input)) { // inputが配列の場合
    const json = [...input];  // そのまま使うと呼び出し元の配列に影響を与えるのでコピー
    for (let i = 0; i < json.length; i++) {
      if (json[i] === null) { // nullを文字列化
        json[i] = "null";
      } else if (typeof json[i] === "string") { // 文字列にクォーテーションを追加
        json[i] = addEscapeSequence(json[i]);
        json[i] = ['\"', json[i], '\"'].join("");
      } else if (Array.isArray(json[i]) || typeof json[i] === "object") {  // 配列 or オブジェクトを再帰的に変換
        json[i] = stringifyJSON(json[i]);
      }
      resultStr = [resultStr, json[i], ","].join("")
    }
    resultStr = resultStr.slice(0, -1);
    resultStr = addBrackets(json, resultStr);
  } else if (typeof input === "object" && input !== null) { // inputがオブジェクトの場合
    const json = { ...input };  // そのまま使うと呼び出し元の配列に影響を与えるのでコピー
    for (let [key, value] of Object.entries(json)) {
      if (typeof key === "string") {
        key = addEscapeSequence(key);
      }
      if (typeof value === "string") {
        value = addEscapeSequence(value);
      }
      if (typeof value === "boolean" || typeof value === "number" || value === null) {
        resultStr = [resultStr, `"${key}":${value},`].join("");
      } else if (typeof value === "string") {
        resultStr = [resultStr, `"${key}":"${value}",`].join("");
      } else if (Array.isArray(value) || typeof value === "object") {
        resultStr = [resultStr, `"${key}":${stringifyJSON(value)},`].join("");
      }
    }
    resultStr = resultStr.slice(0, -1);
    resultStr = addBrackets(json, resultStr);
  }
  return resultStr;
}


