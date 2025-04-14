import { bitCount } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("count bits with 1", () => {
    it("case1", () => {
        expect(bitCount(0b111)).toBe(3);
    });
    it("case2", () => {
        expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    });
    it("case3", () => {
        expect(bitCount(3)).toBe(2);
    });
    it("case4", () => {
        expect(bitCount(15)).toBe(4);
    });
    it("case5", () => {
        expect(bitCount(-7)).toBe(30);
    });
});