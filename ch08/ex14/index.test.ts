import { any, catching } from "./index.ts"

describe("any()", () => {
    test("入力が数値の場合", () => {
        const isNonZero = any(
            (n: number) => n > 0,
            (n: number) => n < 0
        );
        expect(isNonZero(0)).toBe(false);
        expect(isNonZero(42)).toBe(true);
        expect(isNonZero(-0.5)).toBe(true);
    });
});
describe("catching()", () => {
    test("test catching()", () => {
        const safeJsonParse = catching(JSON.parse, (e: ErrorConstructor) => {
            return { error: e.toString() };
        });

        expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
        expect(JSON.stringify(safeJsonParse("{Invalid Json}"))).toBe(`{"error":"SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)"}`);
    });
});
