import { sortJapanese, toJapaneseDateString } from "./index.ts";

describe("sortJapanese()", () => {
    const testdata: string[][][] = [
        [["ぱ", "は", "ば", "つ", "っ"], ['つ', 'っ', 'ぱ', 'は', 'ば']],
        [["ぺ", "ほ", "べ", "ぽ", "あ", "ぼ", "ぁ"], ["あ", "ぁ", "ぺ", "べ", "ほ", "ぽ", "ぼ"]],
        [[], []],
    ]
    const testdataError: [string[], ErrorConstructor][] = [
        [["ぱ", "は", "ば", "つ", "a"], Error],
        [["ぱ", "は", "9", "つ", "っ"], Error],
        [["ぱ", "は", "？", "つ", "っ"], Error],
    ]
    test.each(testdata)("sortJapanese(%s): %s", (date, result
    ) => {
        expect(sortJapanese(date)).toStrictEqual(result);
    })
    test.each(testdataError)("sortJapaneseError(%s): %s", (date, result
    ) => {
        expect(() => sortJapanese(date)).toThrow(result);
    })
});

describe("toJapaneseDateString()", () => {
    const testdata: [Date, string][] = [
        [new Date("2025-06-26"), "令和7年6月26日"],
        [new Date("2015-04-11"), "平成27年4月11日"],
        [new Date("1980-10-09"), "昭和55年10月9日"],
        [new Date("1920-10-09"), "大正9年10月9日"],
        [new Date("1900-02-03"), "明治33年2月3日"],
        [new Date("1853-06-03"), "嘉永6年6月3日"],
    ]
    test.each(testdata)("toJapaneseDateString(%s)", (date, result
    ) => {
        expect(toJapaneseDateString(date)).toStrictEqual(result);
    })
});