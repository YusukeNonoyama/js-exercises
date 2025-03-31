import { equalArrays } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("equalArrays", () => {
    it("明らかに違う値だがtrueを返す引数", () => {
        expect(equalArrays([0, 1], [-0, 1])).toBe(true);
        expect(equalArrays([1, " "], [1, ` `])).toBe(true);
    });
});