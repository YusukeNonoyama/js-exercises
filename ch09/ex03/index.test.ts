import { positiveNumber } from "./index.ts";

describe("positiveNumber()", () => {
  test("getX()", () => {
    let x = positiveNumber(1);
    expect(x.getX).toBe(1);
    x = positiveNumber(10);
    expect(x.getX).toBe(10);
    x = positiveNumber(Infinity);
    expect(x.getX).toBe(Infinity);
  });
  test("setX()", () => {
    let x = positiveNumber(10);
    x.setX = 1;
    expect(x.getX).toBe(1);
    x.setX = 5;
    expect(x.getX).toBe(5);
    x.setX = Infinity;
    expect(x.getX).toBe(Infinity);
  });
  test("setX() Error", () => {
    let x = positiveNumber(10);
    expect(() => {
      x.setX = 0;
    }).toThrow(Error);
    expect(() => {
      x.setX = -5;
    }).toThrow(Error);
    expect(() => {
      x.setX = -Infinity;
    }).toThrow(Error);
    expect(() => {
      x.setX = NaN;
    }).toThrow(Error);
  });
});
