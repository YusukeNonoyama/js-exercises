import { typedMap } from "./index.ts"

describe("typedMap", () => {
    test("constructor()", () => {
        const entries = [[1, 100], [2, 2]];
        let mapA = new typedMap("number", "number", entries);
        expect((mapA as any).keyType).toBe("number");
        expect((mapA as any).valueType).toBe("number");
        expect((mapA as any).entries).toEqual(entries);
    });
    test("constructor() Error", () => {
        const entries = [["1", 100], ["2", 2]];
        expect(() => new typedMap("number", "number", entries)).toThrow(TypeError);
        expect(() => new typedMap("string", "string", entries)).toThrow(TypeError);
        expect(() => new typedMap("string", "boolean", entries)).toThrow(TypeError);
    });
    test("get()", () => {
        const entries = [[1, 100], [2, 2]];
        let mapA = new typedMap("number", "number", entries);
        expect((mapA as any).get(1)).toBe(100);
        expect((mapA as any).get(2)).toBe(2);
        expect((mapA as any).get(3)).toBe(undefined);
    });
    test("get() Error", () => {
        const entries = [[1, 100], [2, 2]];
        let mapA = new typedMap("number", "number", entries);
        expect(() => mapA.get("1")).toThrow(TypeError);
        expect(() => mapA.get(true)).toThrow(TypeError);
        expect(() => mapA.get(null)).toThrow(TypeError);
    });
    test("set()", () => {
        const entries = [[1, 100], [2, 2]];
        let mapA = new typedMap("number", "number", entries);
        mapA.set(3, 30);
        mapA.set(0, 5);
        expect((mapA as any).get(3)).toBe(30);
        expect((mapA as any).get(0)).toBe(5);
    });
    test("set() Error", () => {
        const entries = [[1, 100], [2, 2]];
        let mapA = new typedMap("number", "number", entries);
        expect(() => mapA.set("1", 1)).toThrow(TypeError);
        expect(() => mapA.set(1, "1")).toThrow(TypeError);
        expect(() => mapA.set(1, true)).toThrow(TypeError);
    });
});

// 同じkeyCheck()を使っているものと、mapのメソッドのみを返しているものは省略

// 結果：
// npm run test:ts ./ch09/ex06/

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ./ch09/ex06/

//  PASS  ch09/ex06/index.test.ts
//   typedMap
//     ✓ constructor() (1 ms)
//     ✓ constructor() Error (3 ms)
//     ✓ get()
//     ✓ get() Error (6 ms)
//     ✓ set()
//     ✓ set() Error (1 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |   66.66 |      100 |   41.66 |   66.66 |                   
//  index.ts |   66.66 |      100 |   41.66 |   66.66 | 35-55             
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       6 passed, 6 total
// Snapshots:   0 total
// Time:        1.09 s, estimated 2 s
// Ran all test suites matching /.\/ch09\/ex06\//i.