// 普通にコード書いて判定する場合

const input = "(()(()))";
const input2 = "((())";
const pattern = /\(\)/;

function hasPairsOfParenthethes(input: string) {
  let currResultText = input;
  let prevResultText = "";
  let result: any = [];
  while (currResultText !== "") {
    result = currResultText.match(pattern);
    if (currResultText.match(pattern))
      currResultText =
        currResultText.slice(0, result.index) +
        currResultText.slice(result.index + 2, currResultText.length);
    if (prevResultText === currResultText) {
      return false;
    }
    prevResultText = currResultText;
  }
  return true;
}

console.log(hasPairsOfParenthethes(input));
console.log(hasPairsOfParenthethes(input2));

// result = resultText.match(pattern)
// resultText = resultText.slice(0, result.index) + resultText.slice(result.index + 2, resultText.length)
// console.log(resultText)

// console.log(input.match(pattern));
