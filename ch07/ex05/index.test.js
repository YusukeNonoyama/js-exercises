import { pop, push, shift, unshift, sort } from "./index.js";

test("pop()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(JSON.stringify(pop(seq))).toBe(JSON.stringify([1, 2, 3, 4]));
    expect(JSON.stringify(seq)).toBe(JSON.stringify([1, 2, 3, 4, 5]));
});

test("push()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(JSON.stringify(push(seq, 6))).toBe(JSON.stringify([1, 2, 3, 4, 5, 6]));
    expect(JSON.stringify(seq)).toBe(JSON.stringify([1, 2, 3, 4, 5]));
});

test("shift()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(JSON.stringify(shift(seq))).toBe(JSON.stringify([2, 3, 4, 5]));
    expect(JSON.stringify(seq)).toBe(JSON.stringify([1, 2, 3, 4, 5]));
});

test("unshift()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(JSON.stringify(unshift(seq, 0))).toBe(JSON.stringify([0, 1, 2, 3, 4, 5]));
    expect(JSON.stringify(seq)).toBe(JSON.stringify([1, 2, 3, 4, 5]));
});

test("sort()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(JSON.stringify(sort(seq, (a, b) => b - a))).toBe(JSON.stringify([5, 4, 3, 2, 1]));
    expect(JSON.stringify(seq)).toBe(JSON.stringify([1, 2, 3, 4, 5]));
});
