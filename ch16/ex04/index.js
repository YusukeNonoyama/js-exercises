import fs from "fs/promises";
import iconv from "iconv-lite";

// エンコード非指定でバイナリのバッファとして読み込む
const buffer = await fs.readFile("ch16/ex04/hello.txt");

// バッファを読み込んでShift_JIS → UTF-8 にデコード
const text = iconv.decode(buffer, "shift_jis");

console.log(text);
