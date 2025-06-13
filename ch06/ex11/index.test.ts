import { obj } from "./index.ts";

describe('check get()', () => {
    let p = Object.create(obj);
    const testArrayGetP = [
        [p.r, 1],
        [p.theta, (Math.PI / 3)],
        [p.x, 0.5000000],
        [p.y, (Math.sqrt(3) / 2)],
    ]
    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {
        expect(input).toBeCloseTo(expected);
    });
});

describe('check set() for x', () => {
    let p = Object.create(obj);
    p.x = 1;
    const testArrayGetP = [
        [p.r, 1.3228756555],
        [p.theta, 0.7137243790],
        [p.x, 1.0],
        [p.y, (Math.sqrt(3) / 2)],
    ]

    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {
        expect(input).toBeCloseTo(expected);
    });
});

describe('check set() for y', () => {
    let p = Object.create(obj);
    p.y = 1;
    const testArrayGetP = [
        [p.r, 1.1180339887],
        [p.theta, 1.1071487178],
        [p.x, 0.5000000000],
        [p.y, 1.0000000000],
    ]
    test.each(testArrayGetP)("r, theta, x, y: %s => %s", (input, expected) => {
        expect(input).toBeCloseTo(expected);
    });
});

describe('check for NaN set', () => {
    let p = Object.create(obj);
    it("set NaN for x: ", () => {
        expect(() => { p.x = NaN }).toThrow("invalid input");
    });
    it("set NaN for y: ", () => {
        expect(() => { p.y = NaN }).toThrow("invalid input");
    });
});
