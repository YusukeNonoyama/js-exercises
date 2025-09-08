import { add, sub, mul, div } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("complex number calculation", () => {
  describe("case1", () => {
    let z1 = { real: 1, im: 2 };
    let z2 = { real: 5, im: 2 };

    it("add", () => {
      expect(JSON.stringify(add(z1, z2))).toBe(
        JSON.stringify({ real: "6.00", im: "4.00" }),
      );
    });
    it("sub", () => {
      expect(JSON.stringify(sub(z1, z2))).toBe(
        JSON.stringify({ real: "-4.00", im: "0.00" }),
      );
    });
    it("mul", () => {
      expect(JSON.stringify(mul(z1, z2))).toBe(
        JSON.stringify({ real: "1.00", im: "12.00" }),
      );
    });
    it("div", () => {
      expect(JSON.stringify(div(z1, z2))).toBe(
        JSON.stringify({ real: "0.31", im: "0.28" }),
      );
    });
  });
  describe("case2", () => {
    let z1 = { real: 1.3, im: -2 };
    let z2 = { real: -5, im: 0.4 };

    it("add", () => {
      expect(JSON.stringify(add(z1, z2))).toBe(
        JSON.stringify({ real: "-3.70", im: "-1.60" }),
      );
    });
    it("sub", () => {
      expect(JSON.stringify(sub(z1, z2))).toBe(
        JSON.stringify({ real: "6.30", im: "-2.40" }),
      );
    });
    it("mul", () => {
      expect(JSON.stringify(mul(z1, z2))).toBe(
        JSON.stringify({ real: "-5.70", im: "10.52" }),
      );
    });
    it("div", () => {
      expect(JSON.stringify(div(z1, z2))).toBe(
        JSON.stringify({ real: "-0.29", im: "0.38" }),
      );
    });
  });
  describe("case3: invalid input", () => {
    let z1 = { real: 1, im: 2 };
    let z2 = { real: 5, im: 2 };

    it("add", () => {
      expect(add(z1, 2)).toBe("invalid input: number");
      expect(add(z1, null)).toBe("invalid input: null");
      expect(add(z1, undefined)).toBe("invalid input: undefined");
    });
    it("sub", () => {
      expect(sub(z1, 2)).toBe("invalid input: number");
      expect(sub(z1, null)).toBe("invalid input: null");
      expect(sub(z1, undefined)).toBe("invalid input: undefined");
    });
    it("mul", () => {
      expect(mul(z1, 2)).toBe("invalid input: number");
      expect(mul(z1, null)).toBe("invalid input: null");
      expect(mul(z1, undefined)).toBe("invalid input: undefined");
    });
    it("div", () => {
      expect(div(z1, 2)).toBe("invalid input: number");
      expect(div(z1, null)).toBe("invalid input: null");
      expect(div(z1, undefined)).toBe("invalid input: undefined");
    });
  });
});
