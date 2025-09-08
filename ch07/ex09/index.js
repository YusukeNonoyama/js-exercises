// let a = "𠮷野家"[0];  //=> �
// let b = "👨‍👨‍👧‍👧"[0];   //=> �

// console.log(a);
// console.log(b);
// console.log("𠮷野家"[0]);
// console.log("𠮷野家"[3]);
// console.log("yoshinoya"[0]);
console.log(
  Array.from("𠮷野家").map((char) => char.codePointAt(0)?.toString(8)),
);
console.log("𠮷野家".length); // 4文字
console.log("👨‍👨‍👧‍👧".length); // 11文字

let s = "𠮷";
console.log(s.charCodeAt(0).toString(16)); // d842
console.log(s.charCodeAt(1).toString(16)); // dfb7

// 出力される文字： �
// "replacement character"と呼ばれる。対象の文字が適切に解釈できないときに表示される。
