export function isEmailAddress(input: any) {
  if (!input) {
    return false;
  }
  // "@"の前後、"."の前後の４か所に大きく分けた
  // "."を含む含まないは"|"で表現
  const pattern =
    /^((\w+\.\w+)|(\w|[!#$%&'*+\-/=?^_`{|}~]){1,64})@((\w|[!#$%&'*+\-/=?^_`{|}~])+\.(\w|[!#$%&'*+\-/=?^_`{|}~])+|\w{1,252})$/u;
  if (input.match(pattern)) {
    return true;
  }
  return false;
}
