import { Point } from "./index.js";

describe("math", () => {
  describe("add", () => {
    it("add coordinates to Point", () => {
      let point = new Point(1, 1)
      point.add(2,3);
      expect(point.x).toBe(3);
      expect(point.y).toBe(4);
    });
    it("add coordinates to Point", () => {
      let point = new Point(100, 100)
      point.add(-23,-44);
      expect(point.x).toBe(77);
      expect(point.y).toBe(56);
    });
    it("add coordinates to Point", () => {
      let point = new Point(1, 1)
      point.add(2,3);
      expect(point.x).toBe(3);
      expect(point.y).toBe(4);
    });
  });
});
