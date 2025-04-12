import { equals } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("equals", () => {
    it("1. obj1, obj1", () => {
        const obj1 = { x: 1 };
        const obj2 = { x: 1 };
        expect(equals(obj1, obj1)).toBe(true);
    });
    it("2. 42, 42", () => {
        expect(equals(42, 42)).toBe(true);
    });
    it("3. null, null", () => {
        expect(equals(null, null)).toBe(true);
    });
    it("4. { x: 42 }, 42", () => {
        expect(equals({ x: 42 }, 42)).toBe(false);
    });
    it("5. null, { x: 42 }", () => {
        expect(equals(null, { x: 42 })).toBe(false);
    });
    it("6. { x: 1 }, { y: 1 }", () => {
        expect(equals({ x: 1 }, { y: 1 })).toBe(false);
    });
    it("7. { x: 1 }, { x: 1, y: 1 }", () => {
        expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
    });
    it("8. { x: { y: { z: 10 } } }, { x: { y: { z: 10 } } }", () => {
        expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
    });
    it("9. { x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } }", () => {
        expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(false);
    });
});