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

export function slice(str, indexStart=0, indexEnd=str.length) {
  let substr = "";
  if (isNaN(indexStart)){
    indexStart = 0;
  }
  if (isNaN(indexEnd)){
    indexEnd = 0;
  }
  if (indexStart < 0){
    indexStart = str.length + indexStart;
  }
  if (indexEnd < 0){
    indexEnd = str.length + indexEnd;
  }
  if (indexStart > indexEnd){
    return "";
  }
  for (let i = 0; i < str.length; i++) {
    if (i >= Math.floor(indexStart) && i < Math.floor(indexEnd)){
      substr += str[i];
    }
  }
  return substr;
}

export function padStart(str, targetLength, padString=" ") {
  let substr = "";
  if ( targetLength < str.length){
    return str;
  }
  let paddingLength = targetLength - str.length;

  for (let i = 0; i < paddingLength; i++){
    substr += padString[i % padString.length];
  }
  substr += str;
  return substr;
}

export function trim(str) {
  let substr = ""
  let trimStart;
  let trimEnd;
  for (let i = 0; i < str.length; i++){
    if (str[i] !== " "){
      trimStart = i;
      break
    }
  }
  for (let i = str.length - 1; i >= 0; i--){
    if (str[i] !== " "){
      trimEnd = i;
      break
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (i >= trimStart && i <= trimEnd){
      substr += str[i];
    }
  }
  return substr;
}

