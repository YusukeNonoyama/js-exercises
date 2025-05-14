import { bubbleSort } from "./index.js";

describe('bubbleSort()', () => {

    const testArrayAddMatrix = [
        [
            [8, 4, 7, 2, 1, 3, 5, 6, 9, 10, 5],
            [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
        ],
        [
            [],
            [],
        ],
        [
            null,
            "invalid input",
        ],
        [
            10,
            "invalid input",
        ],
        [
            [5, "a", 3],
            "invalid array element",
        ],
    ]
    test.each(testArrayAddMatrix)("bubbleSOrt(): ", (input, expected) => {

        expect(JSON.stringify(bubbleSort(input))).toBe(JSON.stringify(expected));
    });
});