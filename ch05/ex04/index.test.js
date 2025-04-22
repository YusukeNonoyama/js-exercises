import { fibWhile, fibDoWhile, fibFor } from "./index.js"

let first10 = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

describe('first 10 numbers of Fibonacci sequence', () => {
    it("while loop", () => {
        expect(JSON.stringify(fibWhile())).toBe(JSON.stringify(first10));
    });
    it("Do while loop", () => {
        expect(JSON.stringify(fibDoWhile())).toBe(JSON.stringify(first10));
    });
    it("For loop", () => {
        expect(JSON.stringify(fibFor())).toBe(JSON.stringify(first10));
    });
});