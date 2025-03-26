import { is_same_value } from "./index.js";

describe("is_same_value", () => {
    it("check if two values are the same", () => {        
        expect(is_same_value(0.3 - 0.2, 0.1)).toBe(true);
        expect(is_same_value(0.2 - 0.1, 0.1)).toBe(true);
        expect(is_same_value(0.1, 0)).toBe(false);
        expect(is_same_value(0.0000000000001, 0)).toBe(true);
    });
});

// import { Point } from "./index.js";

// describe("math", () => {
//   describe("add", () => {
//     it("add coordinates to Point", () => {
//       let point = new Point(1, 1)
//       point.add(2,3);
//       expect(point.x).toBe(3);
//       expect(point.y).toBe(4);
//     });
//     it("add coordinates to Point", () => {
//       let point = new Point(100, 100)
//       point.add(-23,-44);
//       expect(point.x).toBe(77);
//       expect(point.y).toBe(56);
//     });
//     it("add coordinates to Point", () => {
//       let point = new Point(1, 1)
//       point.add(2,3);
//       expect(point.x).toBe(3);
//       expect(point.y).toBe(4);
//     });
//   });
// });
