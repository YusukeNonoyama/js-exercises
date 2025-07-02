import { fibonacciSequence, fibonacciSequenceGen } from "./index.ts"

describe("fibonacciSequence()", () => {
    test("next()", () => {
        const iter = fibonacciSequence();
        const iterGen = fibonacciSequenceGen();
        for (let i = 0; i < 10; i++) {
            expect(iter.next()).toEqual(iterGen.next());
        }
        expect(iter.next()).toEqual({ "value": 89, "done": false });
    });
    test("return()", () => {
        const iter = fibonacciSequence();
        const iterGen = fibonacciSequenceGen();
        for (let i = 0; i < 10; i++) {
            expect(iter.next()).toEqual(iterGen.next());
        }
        expect(iter.return()).toEqual(iterGen.return());
    });
    test("throw()", () => {
        // 保留
    });
});
