import { pop, push, shift, unshift, sort } from "./index.ts";

test("pop()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
});

test("push()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
});

test("shift()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
});

test("unshift()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
});

test("sort()", () => {
    const seq = [1, 2, 3, 4, 5];
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
});
