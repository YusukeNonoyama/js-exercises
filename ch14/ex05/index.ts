export const templateToStringWithType = (strings: any, ...input: any) => {
  let result = strings[0];
  for (let i = 0; i < input.length; i++) {
    result += typeof input[i] + strings[i + 1];
  }
  return result;
};
