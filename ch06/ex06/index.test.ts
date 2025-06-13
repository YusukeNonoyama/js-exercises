import { showProperties } from "./index.ts";

describe('check showProperties()', () => {
    // 継承するオブジェクト
    let o1 = { x: 1, y: 2 };
    Object.defineProperty(o1, "enumerable", {
        value: "enumerable",
        writable: true,
        enumerable: true,
        configurable: true,
    })
    // プロパティの継承と独自プロパティの追加
    let o2 = Object.create(o1);
    o2.z = 3;
    o2["text"] = "text";
    o2[10] = 10;

    // 列挙不可な独自プロパティ
    Object.defineProperty(o2, "unenumerable", {
        value: "unenumerable",
        writable: true,
        enumerable: false,
        configurable: true,
    })

    // Symbolの独自プロパティ
    let s = Symbol("sym");
    o2[s] = "symbol";
    const testArray = [
        [o2, [
            '10',
            'z',
            'text',
            'unenumerable',
            Symbol("sym"),
            'x',
            'y',
            'enumerable'
        ]],
    ]
    const testArrayError: [any, ErrorConstructor][] = [
        [1, Error],
        ["string", Error],
        [null, Error],
        [undefined, Error],
    ]
    test.each(testArray)("showProperties(): %s => %s", (input, expected) => {
        expect(showProperties(input).map(String)).toEqual(expected.map(String));
    });

    test.each(testArrayError)("showProperties(): %s => %s", (input, expected) => {
        expect(() => showProperties(input)).toThrow(expected);
    });
});