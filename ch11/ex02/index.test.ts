import * as index from "./index.ts"

describe("cashedSlowFn()", () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
        spy = jest.spyOn(index, "slowFn");
    });
    afterEach(() => {
        spy.mockRestore();
    });

    test("call cachedSlowFn() including the same object", () => {
        const cachedSlowFn = index.cache(index.slowFn);
        let obj = {};
        cachedSlowFn(obj);
        cachedSlowFn(obj);
        cachedSlowFn(obj);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    test("call cachedSlowFn() with new object everytime", () => {
        const cachedSlowFn = index.cache(index.slowFn);
        cachedSlowFn({});
        cachedSlowFn({});
        cachedSlowFn({});
        expect(spy).toHaveBeenCalledTimes(3);
    });
});

// ガーベージコレクションされたかどうかはテスト難しそうなのでやっていない
// タイミングがコントロールできないからテストを書くのは無理？

// 結果：
// npm run test:ts ./ch11/ex02/index.test.ts 

// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ./ch11/ex02/index.test.ts

//  PASS  ch11/ex02/index.test.ts
//   cashe and slowFn()
//     ✓ call cachedSlowFn() including the same object (653 ms)
//     ✓ call cachedSlowFn() with new object everytime (1891 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |                   
//  index.ts |     100 |      100 |     100 |     100 |                   
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        4.889 s, estimated 5 s
// Ran all test suites matching /.\/ch11\/ex02\/index.test.ts/i.