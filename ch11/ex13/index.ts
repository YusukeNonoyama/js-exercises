export function stringifyJSON(input: any) {
  const strMap = new Map([
    ["\"", "\\\""],
    ["\\", "\\\\"],
    ["\b", "\\b"],
    ["\f", "\\f"],
    ["\n", "\\n"],
    ["\r", "\\r"],
    ["\t", "\\t"],
  ])
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
        if (/\n/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\n/g, "\\n");
        } else if (/\t/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\t/g, "\\t");
        } else if (/\r/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\r/g, "\\r");
        } else if (/\\/g.test(json[i])) { // 正規表現でエスケープシーケンスを含む文字を置換
          json[i] = json[i].replace(/\\/g, "\\\\");
        } else if ([...strMap.keys()].includes(json[i])) { // エスケープシーケンスを含む文字
          json[i] = strMap.get(json[i]);
        }
        json[i] = ['\"', json[i], '\"'].join("");
      }
      resultStr = [resultStr, json[i], ","].join("")
    }
    // オブジェクトの場合
  } else if (typeof input === "object" && input !== null) {
    json = { ...input };
    for (let [key, value] of Object.entries(json)) {
      if (typeof value === "boolean" || value === null) {
        resultStr = [resultStr, `"${key}":${value},`].join("");
      } else if (Array.isArray(value) || typeof value === "object") {
        console.log("I am here");
        value = stringifyJSON(value);
      } else {
        resultStr = [resultStr, `"${key}":"${value}",`].join("");
      }
      console.log(key, value);
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


const s = '{"A": false, "B": null, "C": true, "D": {"X": {}}, "E": [[]], "F": 2.71828, "G": "HELLO"}'
const json = JSON.parse(s);
console.log("type: ", typeof json);

console.log(JSON.stringify(json));
console.log(stringifyJSON(json));

// for (const [key, value] of Object.entries(json)) {
//   console.log(key, value);
//   console.log("hey");
// }