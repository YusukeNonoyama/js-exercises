import { addMatrix, multiplyMatrix } from "./index.js";

describe('addMatrix()', () => {

    const testArrayAddMatrix = [
        [
            "case 1",
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            [
                [2, 3, 4],
                [5, 6, 7],
            ],
            [
                [3, 5, 7],
                [9, 11, 13],
            ]],
        [
            "case 2",
            [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
            ],
            [
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [1, 2, 3, 4],
            ],
            [
                [6, 8, 10, 12],
                [14, 16, 18, 20],
                [10, 12, 14, 16],
            ],
        ],
        [
            "case 3",
            [
                [1, 2, 3],
                [4, NaN, 6],
            ],
            [
                [2, 3, 4],
                [5, 6, 7],
            ],
            "NaN element found"
        ],
                [
            "case 4",
            [
                [1, 2, 3],
                [4, NaN],
            ],
            [
                [2, 3, 4],
                [5, 6, 7],
            ],
            "ununiform matrix cols"
        ],
    ]
    test.each(testArrayAddMatrix)("addMatrix(): %s", (_, inputA, inputB, expected) => {

        expect(JSON.stringify(addMatrix(inputA, inputB))).toBe(JSON.stringify(expected));
    });
});

describe('multiplyMatrix()', () => {

    const testArrayMultiplyMatrix = [
        [
            "case 1",
            [
                [1, 2],
                [3, 1],
                [3, 2],
            ],
            [
                [1, 3, 5],
                [2, 4, 1],
            ],
            [
                [5, 11, 7],
                [5, 13, 16],
                [7, 17, 17],
            ]
        ],
        [
            "case 2",
            [
                [1, 2],
                [3, 1],
            ],
            [
                [1, 3, 5],
            ],
            "matrix size unmatched for multiplicaion",
        ],
        [
            "case 3",
            [
                [1, 2],
                [3, 1],
                [3],
            ],
            [
                [1, 3, 5],
                [2, 4, 1],
            ],
            "ununiform matrix cols"
        ],
    ]
    test.each(testArrayMultiplyMatrix)("multiplyMatrix(): %s", (_, inputA, inputB, expected) => {

        expect(JSON.stringify(multiplyMatrix(inputA, inputB))).toBe(JSON.stringify(expected));
    });
});
