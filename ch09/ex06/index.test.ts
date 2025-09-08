import { TypedMap } from "./index.ts";

describe("TypedMap", () => {
  test("constructor()", () => {
    const entryArray = [
      [1, 100],
      [2, 2],
    ];
    let mapA = new TypedMap("number", "number", entryArray);
    expect(mapA.keyType).toBe("number");
    expect(mapA.valueType).toBe("number");
    expect(mapA.entryArray).toEqual(entryArray);
  });
  test("constructor()", () => {
    const entryArray = [
      ["1", 100],
      ["2", 2],
    ];
    let mapA = new TypedMap("string", "number", entryArray);
    expect(mapA.keyType).toBe("string");
    expect(mapA.valueType).toBe("number");
    expect(mapA.entryArray).toEqual(entryArray);
  });

  test("constructor()", () => {
    const entryArray = [
      ["1", true],
      ["2", false],
    ];
    let mapA = new TypedMap("string", "boolean", entryArray);
    expect(mapA.keyType).toBe("string");
    expect(mapA.valueType).toBe("boolean");
    expect(mapA.entryArray).toEqual(entryArray);
  });
  test("constructor() Error", () => {
    const entryArray = [
      ["1", 100],
      ["2", 2],
    ];
    expect(() => new TypedMap("number", "number", entryArray)).toThrow(
      TypeError,
    );
    expect(() => new TypedMap("string", "string", entryArray)).toThrow(
      TypeError,
    );
    expect(() => new TypedMap("string", "boolean", entryArray)).toThrow(
      TypeError,
    );
  });
  test("get()", () => {
    const entryArray = [
      [1, 100],
      [2, 2],
    ];
    let mapA = new TypedMap("number", "number", entryArray);
    expect(mapA.get(1)).toBe(100);
    expect(mapA.get(2)).toBe(2);
    expect(mapA.get(3)).toBe(undefined);
  });
  test("get() Error", () => {
    const entryArray = [
      [1, 100],
      [2, 2],
    ];
    let mapA = new TypedMap("number", "number", entryArray);
    expect(() => mapA.get("1")).toThrow(TypeError);
    expect(() => mapA.get(true)).toThrow(TypeError);
    expect(() => mapA.get(null)).toThrow(TypeError);
  });
  test("set()", () => {
    const entryArray = [
      [1, 100],
      [2, 2],
    ];
    let mapA = new TypedMap("number", "number", entryArray);
    mapA.set(3, 30);
    mapA.set(0, 5);
    expect(mapA.get(3)).toBe(30);
    expect(mapA.get(0)).toBe(5);
  });
  test("set() Error", () => {
    const entryArray = [
      [1, 100],
      [2, 2],
    ];
    let mapA = new TypedMap("number", "number", entryArray);
    expect(() => mapA.set("1", 1)).toThrow(TypeError);
    expect(() => mapA.set(1, "1")).toThrow(TypeError);
    expect(() => mapA.set(1, true)).toThrow(TypeError);
  });
});

// 同じkeyCheck()を使っているものと、mapのメソッドのみを返しているものは省略

// 結果：
// npm run test:ts ch09/ex06

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch09/ex06

//  PASS  ch09/ex06/index.test.ts
//   TypedMap
//     ✓ constructor() (3 ms)
//     ✓ constructor() (1 ms)
//     ✓ constructor()
//     ✓ constructor() Error (8 ms)
//     ✓ get() (1 ms)
//     ✓ get() Error (12 ms)
//     ✓ set() (1 ms)
//     ✓ set() Error (2 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// ----------|---------|----------|---------|---------|-------------------
// All files |   66.66 |      100 |   41.66 |   66.66 |
//  index.ts |   66.66 |      100 |   41.66 |   66.66 | 39-59
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       8 passed, 8 total
// Snapshots:   0 total
// Time:        1.629 s, estimated 3 s
// Ran all test suites matching /ch09\/ex06/i.
