import { equals } from "./index.js"; // typescript で書く場合は "./index.ts"

describe("equals", () => {
    let obj1 = { "x": 100 };
    console.log(obj1);
    obj1["y"] = "dollars";
    console.log(obj1);

    let obj2 = { "x": 100, "y": "dollars" };

    it("Objectの比較をする（===）", () => {
        expect(obj1 === obj2).toBe(false);
    });
    it("Objectの比較をする（要素同士）", () => {
        expect(equals(obj1, obj2)).toBe(true);
    });
});