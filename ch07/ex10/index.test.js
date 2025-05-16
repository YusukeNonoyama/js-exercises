import { DynamicSizeArray } from "./index.js";

describe("custom array test", () => {
    const testArray = [
        [0, 20],
        [1, undefined],
        [2, 1],
        [3, 5],
        ["0", 20],
        ["one", undefined],
    ];
    const testArrayError = [
        [4, "Array index out of range: 4"],
    ];
    let a = new DynamicSizeArray();
    a.set(0, 20);
    a.set(2, 1);
    a.set(3, 5);

    test.each(testArray)("get(): ", (input, expected) => {

        expect(JSON.stringify(a.get(input))).toBe(JSON.stringify(expected));
    });

    test.each(testArrayError)("get() error: ", (input, expected) => {

        expect(() => a.get(input)).toThrow(expected);
    });

});