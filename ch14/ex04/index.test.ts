import { Hiragana } from "./index.ts";

describe("Hiragana()", () => {
  test("入力がひらがなでない場合", async () => {
    expect(() => new Hiragana("a")).toThrow(Error);
  });
  test("入力が一文字でない場合", async () => {
    expect(() => new Hiragana("あい")).toThrow(Error);
  });
  test("文字列が期待される場合", async () => {
    const letter = "あ";
    const hiragana = new Hiragana(letter);
    expect(`${hiragana}`).toBe(letter);
  });
  test("数値が期待される場合", async () => {
    const letter = "あ";
    const hiragana = new Hiragana(letter);
    const unicode = letter.charCodeAt(0);
    expect(Number(hiragana)).toBe(unicode);
  });
  test("どちらでもない場合", async () => {
    const letter = "あ";
    const hiragana = new Hiragana(letter);
    // テキストのように"+"ではnumberになってしまう
    expect(hiragana[Symbol.toPrimitive]("default")).toBe(letter);
  });
  test("比較", async () => {
    // 50 音順(UTF-16 コード単位順)で<や>で比較
    expect(new Hiragana("さ") < new Hiragana("い")).toBe(false);
    expect(new Hiragana("た") < new Hiragana("ま")).toBe(true);
  });
  // 50 音順(UTF-16 コード単位順)で<や>でソート
  test("ソート", async () => {
    const letters = [
      new Hiragana("す"),
      new Hiragana("い"),
      new Hiragana("よ"),
      new Hiragana("う"),
      new Hiragana("び"),
    ];
    // ソートしてから ひらがな にする
    const sorted = letters.sort((a, b) => (a < b ? -1 : 1)).map((unicode) => `${unicode}`);
    expect(sorted).toEqual(["い", "う", "す", "び", "よ"]);
  });
});
