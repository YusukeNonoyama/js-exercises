import { showProperties } from "./index.js";

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
        [1, "invalid input: number"],
        ["object", "invalid input: string"],
        [null, "invalid input: null"],
        [undefined, "invalid input: undefined"],
        [o2, ["10","z","text","unenumerable",null,"x","y","enumerable"]],
    ]
    test.each(testArray)("showProperties(): %s => %s", (input, expected) => {
        expect(JSON.stringify(showProperties(input))).toBe(JSON.stringify(expected));
    });
});