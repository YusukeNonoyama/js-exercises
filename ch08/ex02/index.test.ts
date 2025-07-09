import { calcExponentialRecursive, calcExponentialLoop } from "./index.ts";

const testArray: [number, number, number][] = [
    [2, 4, 16],
    [2, 5, 32],
    [7, 19, 11398895185373144],
    [0, 10, 0],
    [1, 10, 1],
    [7, 0, 1],
];
const testArrayError: [number, number, ErrorConstructor][] = [
    [2, -1, Error],
    [NaN, 2, Error],
];

describe("calcExponentialRecursive()", () => {
    test.each(testArray)("calcExponentialRecursive(%s, %s): %s", (x, n, expected) => {
        expect(calcExponentialRecursive(x, n)).toEqual(expected);
    });
    test.each(testArrayError)("calcExponentialRecursive(%s, %s): %s Error", (x, n, expected) => {
        expect(() => calcExponentialRecursive(x, n)).toThrow(expected);
    });
});

describe("calcExponentialLoop()", () => {
    test.each(testArray)("calcExponentialLoop(%s, %s): %s", (x, n, expected) => {
        expect(calcExponentialLoop(x, n)).toEqual(expected);
    });
    test.each(testArrayError)("calcExponentialLoop(%s, %s): %s Error", (x, n, expected) => {
        expect(() => calcExponentialLoop(x, n)).toThrow(expected);
    });
});
