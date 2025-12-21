import fs from "fs";
import iconv from 'iconv-lite';

// Shift_JIS のままバイナリとして読み込む
const buffer = fs.readFileSync("ch16/ex04/hello.txt");

// Shift_JIS → UTF-8 にデコード
const text = iconv.decode(buffer, 'shift_jis');

console.log(text);
