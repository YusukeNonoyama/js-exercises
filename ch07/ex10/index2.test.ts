import { DynamicSizeArray } from "./index.ts";

describe("DynamicSizeArray get()", () => {
    let a = new DynamicSizeArray();
    a.set(0, 10);
    a.set(2, 20);
    a.set(3, 30);
    const testArray: [number, number|undefined][] = [
        [0, 10],
        [1, undefined],
        [2, 20],
        [3, 30],
    ];
    const testArrayError: [any, ErrorConstructor][] = [
        [-1, Error],
        [4, Error],
        ["one", Error],
        [NaN, Error],

    ];
    test.each(testArray)("get(%s): %s", (input, expected) => {
        expect(a.get(input)).toEqual(expected);
    });
    test.each(testArrayError)("get(%s) error: %s", (input, expected) => {
        expect(() => a.get(input)).toThrow(expected);
    });
});

describe("DynamicSizeArray set()", () => {
    let a = new DynamicSizeArray();
    const testArray: [number,number, number|undefined][] = [
        [0, 10, undefined],
        [1, 20, undefined],
    ];
    const testArrayError: any[]  = [
        [-1,10,  Error],
        [4,10,  Error],
        ["one",10,  Error],
        [NaN,10,  Error],
    ];
    test.each(testArray)("set(%s): %s", (index, value, expected) => {
        expect(a.set(index, value)).toEqual(expected);
    });
    test.each(testArrayError)("set(%s) error: %s", (index, value, expected) => {
        expect(() => a.set(index, value)).toThrow(expected);
    });
    test.each(testArray)("set() value check", (index, value) => {
        expect(a.get(index)).toEqual(value);
    });
});

describe("DynamicSizeArray length()", () => {
    it("length(): 4", () => {
        let a = new DynamicSizeArray();
        expect(a.length()).toBe(4);
    });
    it("length(): 4", () => {
        let a = new DynamicSizeArray();
        a.set(0, 10);
        a.set(1, 20);
        a.set(2, 30);
        a.set(3, 40);
        expect(a.length()).toBe(4);
    });
    it("length(): 8", () => {
        let a = new DynamicSizeArray();
        a.push(10);
        a.push(20);
        a.push(30);
        a.push(40);
        a.push(50);
        expect(a.length()).toBe(8);
    });
});

describe("DynamicSizeArray push()", () => {
    it("put(): 1", () => {
        let a = new DynamicSizeArray();
        expect(a.push(10)).toEqual(undefined);
        expect(a.get(0)).toBe(10);
    });
    it("put(): 4", () => {
        let a = new DynamicSizeArray();
        expect(a.push(10)).toEqual(undefined);
        expect(a.push(20)).toEqual(undefined);
        expect(a.push(30)).toEqual(undefined);
        expect(a.push(40)).toEqual(undefined);
        expect(a.get(0)).toBe(10);
        expect(a.get(3)).toBe(40);
    });
        it("put(): 5", () => {
        let a = new DynamicSizeArray();
        expect(a.push(10)).toEqual(undefined);
        expect(a.push(20)).toEqual(undefined);
        expect(a.push(30)).toEqual(undefined);
        expect(a.push(40)).toEqual(undefined);
        expect(a.push(50)).toEqual(undefined);
        expect(a.get(4)).toBe(50);
    });


});