export function stringifyJSON(input: any) {
  let json;
  let resultStr = "";
  // 配列の場合
  if (Array.isArray(input)) {
    json = [...input];
    for (let i = 0; i < json.length; i++) {
      if (json[i] === null) { // nullを文字列化
        json[i] = "null";
      } else if (Array.isArray(json[i]) || typeof json[i] === "object") {  // 配列 or オブジェクトを再帰的に変換
        json[i] = stringifyJSON(json[i]);
      } else if (typeof json[i] === "string") { // 文字列にクォーテーションを追加
        if (/\\/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\\/g, "\\\\");
        }
        if (/\n/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\n/g, "\\n");
        }
        if (/\t/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\t/g, "\\t");
        }
        if (/\f/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\f/g, "\\f");
        }
        if (/\r/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\r/g, "\\r");
        }
        if (/.*\b.*/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          // json[i] = json[i].replace(/.*\b.*/g, "\\b");
        }
        if (/\u000A/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\u000A/g, "\\u000A");
        }
        if (/\u0012/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\u0012/g, "\\u0012");
        }
        if (/\u0000/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\u0000/g, "\\u0000");
        }
        if (/\u0022/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\u0022/g, '\\"');  // ' " '
        }
        json[i] = ['\"', json[i], '\"'].join("");
      }
      resultStr = [resultStr, json[i], ","].join("")
    }
  } else if (typeof input === "object" && input !== null) { // オブジェクトの場合
    json = { ...input };
    for (let [key, value] of Object.entries(json)) {
      if (/\u0000/g.test(key)) {
        key = key.replace(/\u0000/g, "\\u0000");
      }
      if (typeof value === "boolean" || typeof value === "number" || value === null) {
        resultStr = [resultStr, `"${key}":${value},`].join("");
      } else if (Array.isArray(value) || typeof value === "object") {
        resultStr = [resultStr, `"${key}":${stringifyJSON(value)},`].join("");
      } else if (typeof value === "string") {
        resultStr = [resultStr, `"${key}":"${value}",`].join("");
      }
    }
  }
  resultStr = resultStr.slice(0, -1);
  return addBrackets(json, resultStr);
}

// 対象がvalueかarrayかobjectかを判定して必要なら括弧を加える関数
function addBrackets(input: any, valueStr: string) {
  if (Array.isArray(input)) {
    return ["[", valueStr, "]"].join("");
  } else if (typeof input === "object") {
    return ["{", valueStr, "}"].join("");
  }
}

const s = '["\\"\\\\\\/\\b\\f\\n\\r\\t"]'
const json = JSON.parse(s);
console.log("type: ", json);

console.log(JSON.stringify(json));
console.log(stringifyJSON(json));

// for (const [key, value] of Object.entries(json)) {
//   console.log(key, value);
//   console.log("hey");
// }