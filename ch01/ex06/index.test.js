import { fib } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("fib", () => {
    it("returns fibonach number", () => {
      expect(fib(0)).toBe(0);
    });
    it("returns fibonach number", () => {
      expect(fib(1)).toBe(1);
    });
    it("returns fibonach number", () => {
      expect(fib(2)).toBe(1);
    });
    it("returns fibonach number", () => {
      expect(fib(75)).toBe(2111485077978050);
    });
  });
});
