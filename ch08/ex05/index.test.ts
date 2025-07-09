import { sequenceToObject } from "./index.ts";

describe("create object from a sequence", () => {
    const testArray: [any[], Record<string, any>][] = [
        [["a", 1], { a: 1 }],
        [["a", 1, "b", 2, "c", 3, "d", 4], { a: 1, b: 2, c: 3, d: 4 }],
        [["a", true], { a: true }],
        [["a", "1"], { a: "1" }],
    ];
    const testArrayError: [any, ErrorConstructor][] = [
        [2, Error],
        [[1, 1, 2, 2], Error],
        [["a", 1, "b", 2, "c", 3, "d", 4, "e"], Error],
    ];
    test.each(testArray)("sequenceToObject(%s): %s", (input, expected) => {
        expect(sequenceToObject(...input)).toEqual(expected);
    });
    test.each(testArrayError)("sequenceToObject(%s) Error: %s", (input, expected) => {
        expect(() => sequenceToObject(...input)).toThrow(expected);
    });
}) 