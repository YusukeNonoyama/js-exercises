import { HiraGana } from "./index.ts";

describe('HiraGana()', () => {
    test('文字列が期待される場合', async () => {
        const letter = "あ";
        const hiragana = new HiraGana("あ");
        expect(`${hiragana}`).toBe(letter)
    });
    test('数値が期待される場合', async () => {
        const letter = "あ";
        const hiragana = new HiraGana(letter);
        const unicode = letter.charCodeAt(0);
        expect(Number(hiragana)).toBe(unicode)
    });
    test('どちらでもない場合', async () => {
        const letter = "あ";
        const hiragana = new HiraGana(letter);
        // テキストのように"+"ではnumberになってしまう
        expect(hiragana[Symbol.toPrimitive]("default")).toBe("あ")
    });
    test('入力がひらがなでない場合', async () => {
        expect(() => new HiraGana("a")).toThrow(Error);
    });
    test('入力が一文字でない場合', async () => {
        expect(() => new HiraGana("あい")).toThrow(Error);
    });
    test('比較', async () => {
        // あいうえお順の前の方がunicodeの数値が小さい
        expect(new HiraGana("さ") < new HiraGana("い")).toBe(false);
        expect(new HiraGana("た") < new HiraGana("ま")).toBe(true);
    });
    test('ソート', async () => {
        const letters = [
            new HiraGana("す"),
            new HiraGana("い"),
            new HiraGana("よ"),
            new HiraGana("う"),
            new HiraGana("び"),
        ];
        // ソートしてから ひらがな にする
        const sorted = letters.sort((a, b) => a < b ? -1 : 1).map(c => `${c}`);
        expect(sorted).toEqual(["い", "う", "す", "び", "よ"]);
    });
});