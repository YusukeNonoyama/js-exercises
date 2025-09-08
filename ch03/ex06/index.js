export function slice(str, indexStart = 0, indexEnd = str.length) {
  let substr = "";
  // NaNは0として扱われる
  if (isNaN(indexStart)) indexStart = 0;
  if (isNaN(indexEnd)) indexEnd = 0;
  // 負の場合は後ろから数える
  if (indexStart < 0) indexStart = str.length + indexStart;
  if (indexEnd < 0) indexEnd = str.length + indexEnd;
  // startの方が大きい場合は空文字を返す
  if (indexStart > indexEnd) return "";
  //  文字数分をループ
  for (let i = 0; i < str.length; i++) {
    // indexStartとindexEndの間を出力、Math.floorは小数点への対応
    if (i >= Math.floor(indexStart) && i < Math.floor(indexEnd)) {
      substr += str[i];
    }
  }
  return substr;
}
