import { add, sub, mul, div } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("complex number calculation", () => {
    describe("case1", () => {
        let z1 = { real: 1, im: 2 };
        let z2 = { real: 5, im: 2 };

        it("add", () => {
            expect(add(z1, z2).real).toBe(6);
            expect(add(z1, z2).im).toBe(4);
        });
        it("sub", () => {
            expect(sub(z1, z2).real).toBe(-4);
            expect(sub(z1, z2).im).toBe(0);
        });
        it("mul", () => {
            expect(mul(z1, z2).real).toBe(1);
            expect(mul(z1, z2).im).toBe(12);
        });
        it("div", () => {
            expect(div(z1, z2).real).toBe(0.31);
            expect(div(z1, z2).im).toBe(0.28);
        });
    });
    describe("case2", () => {
        let z1 = { real: 1.3, im: -2 };
        let z2 = { real: -5, im: 0.4 };

        it("add", () => {
            expect(add(z1, z2).real).toBe(-3.7);
            expect(add(z1, z2).im).toBe(-1.6);
        });
        it("sub", () => {
            expect(sub(z1, z2).real).toBe(6.3);
            expect(sub(z1, z2).im).toBe(-2.4);
        });
        it("mul", () => {
            expect(mul(z1, z2).real).toBe(-5.7);
            expect(mul(z1, z2).im).toBe(10.52);
        });
        it("div", () => {
            expect(div(z1, z2).real).toBe(-0.29);
            expect(div(z1, z2).im).toBe(0.38);
        });
    });
});