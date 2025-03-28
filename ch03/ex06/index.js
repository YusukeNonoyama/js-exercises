export function substring(str, indexStart, indexEnd=str.length) {
  let substr = "";
  if (isNaN(indexStart)){
    indexStart = 0;
  }
  if (isNaN(indexEnd)){
    indexEnd = 0;
  }
  if (indexStart > indexEnd){
    let temp = indexStart;
    indexStart = indexEnd;
    indexEnd = temp;
  }
  for (let i = 0; i < str.length; i++) {
    if (i >= Math.floor(indexStart) && i < Math.floor(indexEnd)){
      substr += str[i];
    }
  }
  return substr;
}

export function slice(str, indexStart, indexEnd) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function padStart(str, targetLength, padString) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function trim(str) {
  // TODO: ここを実装しなさい
  return "TODO";
}

// console.log(substring("test", 1, 3));
// console.log(substring("test", 1));
console.log("Hello World!".substring(2, NaN));
console.log(substring("Hello World!", 2, NaN));