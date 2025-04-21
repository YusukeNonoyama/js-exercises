import { AddBackSlach } from "./index.js";

let test_array = [
  ["0", "\\0"],
  ["b", "\\b"],
  ["t", "\\t"],
  ["n", "\\n"],
  ["v", "\\v"],
  ["f", "\\f"],
  ["r", "\\r"],
  ['"', '\\"'],
  ["'", "\\'"],
  ["\\", "\\\\"],
  ["1234567890", "123456789\\0"],
  ["string0", "s\\t\\ri\\ng\\0"],
  [true, true],
  [{x:1}, {x:1}],
  [null, null],
  [undefined, undefined],
]

test.each(test_array)("add backslash with if else conditionals: %s => %s", (input, expected) => {
  expect(JSON.stringify(AddBackSlach.withElseif(input))).toBe(JSON.stringify(expected));
});

test.each(test_array)("add backslash with switch conditionals: %s => %s", (input, expected) => {
  expect(JSON.stringify(AddBackSlach.withSwitch(input))).toBe(JSON.stringify(expected));
});

test.each(test_array)("add backslash with if conditionals: %s => %s", (input, expected) => {
  expect(JSON.stringify(AddBackSlach.withIf(input))).toBe(JSON.stringify(expected));
});