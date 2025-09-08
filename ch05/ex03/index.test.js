import { Has31Days } from "./index.js";

let test_array_normal = [
  ["Jan", true],
  ["Mar", true],
  ["May", true],
  ["Jul", true],
  ["Aug", true],
  ["Oct", true],
  ["Dec", true],
  ["Feb", false],
  ["Apr", false],
  ["Jun", false],
  ["Sep", false],
  ["Nov", false],
];

let test_array_error = [
  [true, "Invalid Input"],
  [{ x: 1 }, "Invalid Input"],
  [null, "Invalid Input"],
  [undefined, "Invalid Input"],
];

// Else ifのテスト
describe("Has31Days with Elseif", () => {
  test.each(test_array_normal)("Normal: %s => %s", (input, expected) => {
    expect(JSON.stringify(Has31Days.withElseif(input))).toBe(
      JSON.stringify(expected),
    );
  });
  test.each(test_array_error)("Error: %s => %s", (input, expected) => {
    expect(() => Has31Days.withElseif(input)).toThrow(expected);
  });
});

// Switchのテスト
describe("Has31Days with Switch", () => {
  test.each(test_array_normal)("Normal: %s => %s", (input, expected) => {
    expect(JSON.stringify(Has31Days.withSwitch(input))).toBe(
      JSON.stringify(expected),
    );
  });
  test.each(test_array_error)("Error: %s => %s", (input, expected) => {
    expect(() => Has31Days.withSwitch(input)).toThrow(expected);
  });
});

// Else ifで見やすく書いたver2のテスト
describe("Has31Days with Else if ver2", () => {
  test.each(test_array_normal)("Normal: %s => %s", (input, expected) => {
    expect(JSON.stringify(Has31Days.withElseif2(input))).toBe(
      JSON.stringify(expected),
    );
  });
  test.each(test_array_error)("Error: %s => %s", (input, expected) => {
    expect(() => Has31Days.withElseif2(input)).toThrow(expected);
  });
});
