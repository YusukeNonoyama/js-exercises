import { primes } from "./index.ts";

describe("counterGen()", () => {
    test("next() イテレーションの途中でリセット", () => {
        const gen = primes();
        expect(gen.next().value).toEqual(2);
        expect(gen.next().value).toEqual(3);
        expect(gen.next().value).toEqual(5);
        expect(gen.next().value).toEqual(7);
        expect(gen.next().value).toEqual(11);
        expect(gen.next().value).toEqual(13);
        expect(gen.next().value).toEqual(17);
        expect(gen.next().value).toEqual(19);
        expect(gen.next().value).toEqual(23);
        expect(gen.next().value).toEqual(29);
        expect(gen.next().value).toEqual(31);
        expect(gen.next().value).toEqual(37);
    });
});