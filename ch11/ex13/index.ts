export function stringifyJSON(json: any) {
  let resultStr = "";
  for (let i = 0; i < json.length; i++) {
    if (json[i] === null) {
      json[i] = "null";
    } else if (json[i].isArray || typeof json[i] === "object") {
      json[i] = stringifyJSON(json[i]);
    }
    resultStr = [resultStr, json[i], ","].join("")
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


const s = '[false, null, true, {}, [], 1, "HELLO"]'
const json = JSON.parse(s);
const r = JSON.stringify(json);

console.log(r);
console.log(stringifyJSON(json));

console.log(JSON.stringify([[]]));
console.log(stringifyJSON([[]]));

const t = '{"A": false, "B": null, "C": true, "D": {"X": {}}, "E": [[]], "F": 2.71828, "G": "HELLO"}'

console.log(JSON.stringify(t));
console.log(stringifyJSON(t));
