export class AddBackslash {
  // else ifで条件分岐
  static withElseif(inputText) {
    if (typeof inputText !== "string") return inputText;
    let outputText = "";
    for (let letter of inputText) {
      if (letter === "0") letter = "\\" + letter;
      else if (letter === "b") letter = "\\" + letter;
      else if (letter === "t") letter = "\\" + letter;
      else if (letter === "n") letter = "\\" + letter;
      else if (letter === "v") letter = "\\" + letter;
      else if (letter === "f") letter = "\\" + letter;
      else if (letter === "r") letter = "\\" + letter;
      else if (letter === '"') letter = "\\" + letter;
      else if (letter === "'") letter = "\\" + letter;
      else if (letter === "\\") letter = "\\" + letter;
      outputText += letter;
    }
    // console.log(outputText);
    return outputText;
  }

  // switchで条件分岐
  static withSwitch(inputText) {
    if (typeof inputText !== "string") return inputText;
    let outputText = "";
    for (let letter of inputText) {
      switch (letter) {
        case "0":
          letter = "\\" + letter;
          break;
        case "b":
          letter = "\\" + letter;
          break;
        case "t":
          letter = "\\" + letter;
          break;
        case "n":
          letter = "\\" + letter;
          break;
        case "v":
          letter = "\\" + letter;
          break;
        case "f":
          letter = "\\" + letter;
          break;
        case "r":
          letter = "\\" + letter;
          break;
        case '"':
          letter = "\\" + letter;
          break;
        case "'":
          letter = "\\" + letter;
          break;
        case "\\":
          letter = "\\" + letter;
          break;
      }
      outputText += letter;
    }
    // console.log(outputText);
    return outputText;
  }

  // １つのifで条件分岐（見やすい）
  static withIf(inputText) {
    if (typeof inputText !== "string") return inputText;
    let outputText = "";
    let targetLetters = ["0", "b", "t", "n", "v", "f", "r", "'", '"', "\\"];
    for (let letter of inputText) {
      if (targetLetters.includes(letter)) letter = "\\" + letter;
      outputText += letter;
    }
    // console.log(outputText);
    return outputText;
  }
}

AddBackslash.withElseif("f");
// AddBackSlach.withSwitch("00ddff")
// AddBackSlach.withIf("00ddff")
