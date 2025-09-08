export function f(input: string) {
  // input中の$の数をカウント
  const count$ = input.split("$").length - 1;
  // 配列に文字列としてinputの$の数だけ$xを格納
  const variables = [];
  for (let i = 0; i < count$; i++) {
    variables.push(`$${i + 1}`);
  }
  // 複数列の場合はreturnが必ずあるから判定に使用
  if (input.includes("return")) {
    return new Function(...variables, `${input}`);
  } else {
    return new Function(...variables, `return ${input};`);
  }
}
