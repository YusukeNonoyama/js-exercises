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