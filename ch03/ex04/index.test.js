// import { is_same_value } from "./index.js";

describe("", () => {
    it("check if two values are the same", () => {        

        console.log("💯".length)
        // console.log("💯")
        // console.log("\uD83D\uDCAF")
        // console.log("\u{0001F4AF}")

        expect("\uD83D\uDCAF".length === "\u{0001F4AF}".length).toBe(true);
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
