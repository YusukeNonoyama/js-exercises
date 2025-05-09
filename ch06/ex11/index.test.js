import { PClass } from "./index.js";

describe('check get()', () => {

    let p_instance = new PClass();
    let p = p_instance.p;

    const testArrayGetP = [
        [p.r, 1],
        [p.theta, (Math.PI / 3).toFixed(PClass.DIGIT_NUMBER)],
        [p.x, "0.5000000000"],
        [p.y, (Math.sqrt(3) / 2).toFixed(PClass.DIGIT_NUMBER)],
    ]
    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {
        // expect(JSON.stringify(input)).toBe(JSON.stringify(expected));

        expect(input).toBe(expected);
    });
});

describe('check set() for x', () => {
    let p_instance = new PClass();
    let p = p_instance.p;

    p.x = 1;
    const testArrayGetP = [
        [p.r, "1.3228756555"],
        [p.theta, "0.7137243790"],
        [p.x, "0.9999999999"],
        [p.y, (Math.sqrt(3) / 2).toFixed(PClass.DIGIT_NUMBER)],
    ]


    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {

        // expect(JSON.stringify(input)).toBe(JSON.stringify(expected));
        expect(input).toBe(expected);
    });
});

describe('check set() for y', () => {
    let p_instance = new PClass();
    let p = p_instance.p;

    p.y = 1;
    const testArrayGetP = [
        [p.r, "1.1180339887"],
        [p.theta, "1.1071487178"],
        [p.x, "0.5000000000"],
        [p.y, "1.0000000000"],
    ]


    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {

        // expect(JSON.stringify(input)).toBe(JSON.stringify(expected));
        expect(input).toBe(expected);
    });
});

describe('check for NaN set', () => {

    let p_instance = new PClass();
    let p = p_instance.p;

    it("set NaN for x: ", () => {
        expect(() => { p.x = NaN }).toThrow("invalid input");
    });
    it("set NaN for y: ", () => {
        expect(() => { p.y = NaN }).toThrow("invalid input");
    });
});
