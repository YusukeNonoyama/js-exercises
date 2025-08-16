import * as index from "./index.ts"

describe("cashedSlowFn()", () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
        spy = jest.spyOn(index, "slowFn");
    });
    afterEach(() => {
        spy.mockRestore();
    });

    test("cachedSlowFn()を同じ引数で３回呼び出す", () => {
        const cachedSlowFn = index.cache(index.slowFn);
        const obj = { iteration: 7 ** 10 };
        cachedSlowFn(obj);
        cachedSlowFn(obj);
        cachedSlowFn(obj);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    test("cachedSlowFn()を異なる引数で２回呼び出した後、同じ引数で１回呼び出す", () => {
        const cachedSlowFn = index.cache(index.slowFn);
        const obj1 = { iteration: 7 ** 10 };
        const obj2 = { iteration: 6 ** 10 };
        cachedSlowFn(obj1);
        cachedSlowFn(obj2);
        cachedSlowFn(obj1);
        expect(spy).toHaveBeenCalledTimes(2);
    });
    test("cachedSlowFn()を異なる引数で３回呼び出す", () => {
        const cachedSlowFn = index.cache(index.slowFn);
        const obj1 = { iteration: 7 ** 10 };
        const obj2 = { iteration: 6 ** 10 };
        const obj3 = { iteration: 5 ** 10 };
        cachedSlowFn(obj1);
        cachedSlowFn(obj2);
        cachedSlowFn(obj3);
        expect(spy).toHaveBeenCalledTimes(3);
    });
});

// ガーベージコレクションされたかどうかはテスト難しそうなのでやっていない
// タイミングがコントロールできないからテストを書くのは無理？

// 結果：
// npm run test:ts ./ch11/ex02/index.test.ts 
// > preset-ts@1.0.0 test:ts
// > jest --runInBand --coverage ch11/ex02

//  PASS  ch11/ex02/index.test.ts
//   cashedSlowFn()
//     ✓ cachedSlowFn()を同じ引数で３回呼び出す (357 ms)
//     ✓ cachedSlowFn()を異なる引数で２回呼び出した後、同じ引数で１回呼び出す (432 ms)
//     ✓ cachedSlowFn()を異なる引数で３回呼び出す (448 ms)

// ----------|---------|----------|---------|---------|-------------------
// File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
// ----------|---------|----------|---------|---------|-------------------
// All files |     100 |      100 |     100 |     100 |                   
//  index.ts |     100 |      100 |     100 |     100 |                   
// ----------|---------|----------|---------|---------|-------------------
// Test Suites: 1 passed, 1 total
// Tests:       3 passed, 3 total
// Snapshots:   0 total
// Time:        2.449 s, estimated 3 s
// Ran all test suites matching /ch11\/ex02/i.