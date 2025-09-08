import { DynamicSizeArray } from "./index.ts";

describe("DynamicSizeArray get()", () => {
  let a = new DynamicSizeArray();
  a.set(0, 10);
  a.set(2, 20);
  a.set(3, 30);
  const testArray: [number, number | undefined][] = [
    [0, 10],
    [1, undefined],
    [2, 20],
    [3, 30],
  ];
  const testArrayError: [any, ErrorConstructor][] = [
    [-1, Error],
    [4, Error],
    ["one", Error],
    [NaN, Error],
  ];
  test.each(testArray)("get(%s): %s", (input, expected) => {
    expect(a.get(input)).toEqual(expected);
  });
  test.each(testArrayError)("get(%s) error: %s", (input, expected) => {
    expect(() => a.get(input)).toThrow(expected);
  });
});

describe("DynamicSizeArray set()", () => {
  let a = new DynamicSizeArray();
  a.set(2, 10);
  const testArray: [number, number, number | undefined][] = [
    [0, 10, undefined],
    [1, 20, undefined],
    [2, 30, undefined],
  ];
  const testArrayError: [any, number, ErrorConstructor][] = [
    [-1, 10, Error],
    [4, 10, Error],
    ["one", 10, Error],
    [NaN, 10, Error],
  ];
  test.each(testArray)("set(%s): %s", (index, value, expected) => {
    expect(a.set(index, value)).toEqual(expected);
  });
  test.each(testArrayError)("set(%s) error: %s", (index, value, expected) => {
    expect(() => a.set(index, value)).toThrow(expected);
  });
  test.each(testArray)("set() value check", (index, value) => {
    expect(a.get(index)).toEqual(value);
  });
});

describe("DynamicSizeArray length()", () => {
  it("length(): 4", () => {
    let a = new DynamicSizeArray();
    expect(a.length()).toBe(4);
  });
  it("length(): 4", () => {
    let a = new DynamicSizeArray();
    a.set(0, 10);
    a.set(0, 100);
    a.set(1, 20);
    a.set(2, 30);
    a.set(3, 40);
    expect(a.length()).toBe(4);
  });
  it("length(): 8", () => {
    let a = new DynamicSizeArray();
    a.push(10);
    a.push(20);
    a.push(30);
    a.push(40);
    a.push(50);
    expect(a.length()).toBe(8);
  });
});

describe("DynamicSizeArray push()", () => {
  it("push(): 1", () => {
    let a = new DynamicSizeArray();
    expect(a.push(10)).toEqual(undefined);
    expect(a.get(0)).toBe(10);
    expect(a.get(3)).toEqual(undefined);
  });
  it("push(): 4", () => {
    let a = new DynamicSizeArray();
    expect(a.push(10)).toEqual(undefined);
    expect(a.push(20)).toEqual(undefined);
    expect(a.push(30)).toEqual(undefined);
    expect(a.push(40)).toEqual(undefined);
    expect(a.get(0)).toBe(10);
    expect(a.get(3)).toBe(40);
  });
  it("push(): 5", () => {
    let a = new DynamicSizeArray();
    expect(a.push(10)).toEqual(undefined);
    expect(a.push(20)).toEqual(undefined);
    expect(a.push(30)).toEqual(undefined);
    expect(a.push(40)).toEqual(undefined);
    expect(a.push(50)).toEqual(undefined);
    expect(a.get(0)).toBe(10);
    expect(a.get(4)).toBe(50);
  });
});

// 結果：
// npm run test:ts ch07/ex10

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch07/ex10

//  PASS  ch07/ex10/index.test.ts
//   DynamicSizeArray get()
//     ✓ get(0): 10 (2 ms)
//     ✓ get(1): undefined
//     ✓ get(2): 20 (1 ms)
//     ✓ get(3): 30
//     ✓ get(-1) error: function Error() { [native code] } (11 ms)
//     ✓ get(4) error: function Error() { [native code] } (1 ms)
//     ✓ get(one) error: function Error() { [native code] } (1 ms)
//     ✓ get(NaN) error: function Error() { [native code] } (1 ms)
//   DynamicSizeArray set()
//     ✓ set(0): 10 (1 ms)
//     ✓ set(1): 20 (1 ms)
//     ✓ set(2): 30
//     ✓ set(-1) error: 10 (1 ms)
//     ✓ set(4) error: 10 (1 ms)
//     ✓ set(one) error: 10 (1 ms)
//     ✓ set(NaN) error: 10 (1 ms)
//     ✓ set() value check (1 ms)
//     ✓ set() value check
//     ✓ set() value check (1 ms)
//   DynamicSizeArray length()
//     ✓ length(): 4 (1 ms)
//     ✓ length(): 4 (2 ms)
//     ✓ length(): 8
//   DynamicSizeArray push()
//     ✓ push(): 1
//     ✓ push(): 4 (1 ms)
//     ✓ push(): 5 (1 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// ----------|---------|----------|---------|---------|-------------------
// All files |   97.29 |    92.85 |     100 |   97.14 |
//  index.ts |   97.29 |    92.85 |     100 |   97.14 | 12
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       24 passed, 24 total
// Snapshots:   0 total
// Time:        2.404 s, estimated 3 s
// Ran all test suites matching /ch07\/ex10/i.
