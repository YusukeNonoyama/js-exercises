import { omitOddNumber } from "./index.js";

let test_array_normal = [
  [{ x: 1, y: 2, z: 3 }, { y: 2 }],
  [{ x: -1, y: -2, z: -3 }, { y: -2 }],
  [
    { x: 0, y: 4, z: 5 },
    { x: 0, y: 4 },
  ],
  [
    { x: 6, y: 7, z: 8 },
    { x: 6, z: 8 },
  ],
  [{ x: 9, y: 10, z: 11 }, { y: 10 }],
  [{ x: 1, y: 2312412, z: 543540981 }, { y: 2312412 }],
  [
    { a: 101, b: 202, c: 303, x: 1, y: 2, z: 3 },
    { b: 202, y: 2 },
  ],
];

const ERROR_MESSAGE = "Object should have number type in every value.";

let test_array_error = [
  [{ x: 1, y: 2, z: "3" }, ERROR_MESSAGE],
  [{ x: 1, y: 2, z: true }, ERROR_MESSAGE],
  [{ x: 1, y: 2, z: null }, ERROR_MESSAGE],
  [{ x: 1, y: 2, z: undefined }, ERROR_MESSAGE],
];

describe("Omit odd number from object", () => {
  test.each(test_array_normal)("Normal: %s => %s", (input, expected) => {
    expect(JSON.stringify(omitOddNumber(input))).toBe(JSON.stringify(expected));
  });
  test.each(test_array_error)("Normal: %s => %s", (input, expected) => {
    expect(() => omitOddNumber(input)).toThrow(expected);
  });
});
