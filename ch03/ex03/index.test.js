import { isSameValue } from "./index.js";

describe("is_same_value", () => {
    it("check if two values are the same", () => {        
        expect(isSameValue(0.3 - 0.2, 0.1)).toBe(true);
        expect(isSameValue(0.2 - 0.1, 0.1)).toBe(true);
        expect(isSameValue(0.1, 0)).toBe(false);
        expect(isSameValue(0.0000000000001, 0)).toBe(true);
    });
});