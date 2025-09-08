import { sub } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("bit wise subtraction", () => {
  it("case1", () => {
    expect(sub(8, 3)).toBe(5);
  });
  it("case2", () => {
    expect(sub(10304, 123)).toBe(10181);
  });
  it("case3", () => {
    expect(sub(15, -3)).toBe(18);
  });
  it("case4", () => {
    expect(sub(8, 100)).toBe(-92);
  });
  it("case5", () => {
    expect(sub(-21, 100)).toBe(-121);
  });
});
