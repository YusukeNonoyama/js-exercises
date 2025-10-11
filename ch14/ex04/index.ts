export class Hiragana {
  #letter;
  #unicode;
  constructor(letter: string) {
    if (letter.length !== 1) {
      throw new Error(`input should be one letter: ${letter}`);
    }
    if (!letter.match(/[\u3041-\u3096]/)) {
      throw new Error(`input should be Hiragana: ${letter}`);
    }
    this.#letter = letter;
    this.#unicode = letter.charCodeAt(0);  // UTF-16 コード単位の 10進数表現
  }
  [Symbol.toPrimitive](hint: number | string) {
    // 数字が期待される場合にはUTF-16 コード単位を返す
    if (hint === "number") {
      return this.#unicode;
    }
    // 文字列が期待される場合と、どちらでもない場合にはひらがなを返す
    return this.#letter;
  }
}
