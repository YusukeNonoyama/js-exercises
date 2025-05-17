import { calcExponentialRecursive, calcExponentialLoop } from "./index.ts";

describe("Calculate exponential with recursive function", () => {

    const testArray: [number, number, number][] = [
        [2, 4, 16],
        [2, 6, 64],
        [2, 20, 1048576],
        [7, 19, 11398895185373144],
        [0, 10, 0],
        [7, 0, 1],
    ];
    const testArrayError: [number, number, ErrorConstructor][] = [
        [2, -1, Error],
        [NaN, 2, Error],
    ];
    test.each(testArray)("calcExponentialRecursive(%s, %s): %s", (x, n, expected) => {
        expect(calcExponentialRecursive(x, n)).toEqual(expected);
    });
    test.each(testArrayError)("calcExponentialRecursive(%s, %s): %s", (x, n, expected) => {
        expect(() => calcExponentialRecursive(x, n)).toThrow(expected);
    });
    test.each(testArray)("calcExponentialLoop(%s, %s): %s", (x, n, expected) => {
        expect(calcExponentialLoop(x, n)).toEqual(expected);
    });
    test.each(testArrayError)("calcExponentialLoop(%s, %s): %s", (x, n, expected) => {
        expect(() => calcExponentialLoop(x, n)).toThrow(expected);
    });
}) 