import { bubbleSort } from "./index.ts";

describe('bubbleSort()', () => {
    const testArrayAddMatrix = [
        [
            [8, 4, 7, 2, 1, 3, 5, 6, 9, 10, 5],
            [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
        ],
        [
            [8, 4, 7, 2.5, 1, 3, 5, 6, 0, 10, -10],
            [-10, 0, 1, 2.5, 3, 4, 5, 6, 7, 8, 10],
        ],
        [
            [],
            [],
        ],
    ]
    const testArrayAddMatrixError: [any, ErrorConstructor][] = [
        [
            null,
            Error,
        ],
        [
            10,
            Error,
        ],
        [
            [5, "a", 3],
            Error,
        ],
    ]
    test.each(testArrayAddMatrix)("bubbleSOrt(): ", (input, expected) => {
        expect(bubbleSort(input)).toEqual(expected);
    });
    test.each(testArrayAddMatrixError)("bubbleSOrt() Error: ", (input, expected) => {
        expect(() => bubbleSort(input)).toThrow(expected);
    });
});