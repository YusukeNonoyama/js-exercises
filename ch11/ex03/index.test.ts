import { little2Big, big2Little } from "./index.ts"

describe("check Uint32Array func", () => {
    test("little2Big() 1", () => {
        expect(little2Big(new Uint32Array([0x00000001]))).toEqual(new Uint32Array([0x01000000]));
    });
    test("little2Big() 大きい数", () => {
        expect(little2Big(new Uint32Array([0x12345678]))).toEqual(new Uint32Array([0x78563412]));
    });
    test("little2Big() 0", () => {
        expect(little2Big(new Uint32Array([0x00000000]))).toEqual(new Uint32Array([0x00000000]));
    });
    test("big2Little()", () => {
        expect(big2Little(new Uint32Array([1]))).toEqual(new Uint32Array([0x01000000]));
    });
});

// 結果：
// npm run test:ts ./ch11/ex03

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ./ch11/ex03

//  PASS  ch11/ex03/index.test.ts
//   check Uint32Array func
//     ✓ Little endian to big endian() (1 ms)
//     ✓ big endian to Little endian()

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |                   
//  index.ts |     100 |      100 |     100 |     100 |                   
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        1.193 s, estimated 2 s
// Ran all test suites matching /.\/ch11\/ex03/i.