export const templateToStringWithType = (strings: any, ...input: any) => {
  // strings は補完値の両側の文字列、input は補完値の配列
  let result = strings[0];
  // 補完値の数だけループ
  for (let i = 0; i < input.length; i++) {
    result += typeof input[i] + strings[i + 1]; // 補完値の中身は型にする
  }
  return result;
};
