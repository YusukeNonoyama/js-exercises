import { addMatrix, multiplyMatrix } from "./index.ts";

describe("addMatrix()", () => {
  const testArrayAddMatrix: (string | number[][])[][] = [
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
      ],
    ],
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
  ];

  const testArrayAddMatrixError: (string | number[][] | ErrorConstructor)[][] =
    [
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
        Error,
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
        Error,
      ],
      [
        "case 5",
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [2, 3, 4],
          [5, 6, 7],
        ],
        Error,
      ],
      [
        "case 6",
        [
          [1, 2, 3, 4],
          [4, 5, 6, 6],
        ],
        [
          [2, 3, 4],
          [5, 6, 7],
        ],
        Error,
      ],
    ];

  test.each(testArrayAddMatrix)(
    "addMatrix(): %s",
    (_, inputA, inputB, expected) => {
      expect(
        JSON.stringify(addMatrix(inputA as number[][], inputB as number[][])),
      ).toBe(JSON.stringify(expected));
    },
  );
  test.each(testArrayAddMatrixError)(
    "addMatrix() Error: %s",
    (_, inputA, inputB, expected) => {
      expect(() =>
        addMatrix(inputA as number[][], inputB as number[][]),
      ).toThrow(expected as ErrorConstructor);
    },
  );
});

describe("multiplyMatrix()", () => {
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
      ],
    ],
  ];
  const testArrayMultiplyMatrixError = [
    [
      "case 2",
      [
        [1, 2],
        [3, 1],
      ],
      [[1, 3, 5]],
      Error,
    ],
    [
      "case 3",
      [[1, 2], [3, 1], [3]],
      [
        [1, 3, 5],
        [2, 4, 1],
      ],
      Error,
    ],
  ];
  test.each(testArrayMultiplyMatrix)(
    "multiplyMatrix(): %s",
    (_, inputA, inputB, expected) => {
      expect(
        JSON.stringify(
          multiplyMatrix(inputA as number[][], inputB as number[][]),
        ),
      ).toBe(JSON.stringify(expected));
    },
  );
  test.each(testArrayMultiplyMatrixError)(
    "multiplyMatrix() Error: %s",
    (_, inputA, inputB, expected) => {
      expect(() =>
        multiplyMatrix(inputA as number[][], inputB as number[][]),
      ).toThrow(expected as ErrorConstructor);
    },
  );
});
