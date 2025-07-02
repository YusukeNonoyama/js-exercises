import { counterGen } from "./index.ts";

describe("counterGen()", () => {
    test("next() イテレーションの途中でリセット", () => {
        const gen = counterGen(5);
        expect(gen.next()).toEqual({ "value": 1, "done": false });
        expect(gen.next()).toEqual({ "value": 2, "done": false });
        expect(gen.next()).toEqual({ "value": 3, "done": false });
        expect(gen.throw("reset")).toEqual({ "value": 1, "done": false });
        expect(gen.next()).toEqual({ "value": 2, "done": false });
        expect(gen.next()).toEqual({ "value": 3, "done": false });
        expect(gen.next()).toEqual({ "value": 4, "done": false });
        expect(gen.next()).toEqual({ "value": 5, "done": false });
        expect(gen.next()).toEqual({ "value": undefined, "done": true });
    });
    test("next() イテレーション終了後はリセットできない", () => {
        const gen = counterGen(3);
        expect(gen.next()).toEqual({ "value": 1, "done": false });
        expect(gen.next()).toEqual({ "value": 2, "done": false });
        expect(gen.next()).toEqual({ "value": 3, "done": false });
        expect(gen.next()).toEqual({ "value": undefined, "done": true });
        expect(() => gen.throw("reset")).toThrow("reset");
    });
    test("next() イテレーション開始前はリセットできない", () => {
        const gen = counterGen(3);
        expect(() => gen.throw("reset")).toThrow("reset");
    });
});