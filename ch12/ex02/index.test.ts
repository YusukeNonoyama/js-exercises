import { fibonacciSequence, fibonacciSequenceGen } from "./index.ts";

describe("fibonacciSequence()がfibonacciSequenceGen()と同じ出力をする", () => {
  test("next()", () => {
    const iter = fibonacciSequence();
    const iterGen = fibonacciSequenceGen();
    for (let i = 0; i < 100; i++) {
      expect(iter.next()).toEqual(iterGen.next());
    }
  });
  test("return()", () => {
    const iter = fibonacciSequence();
    const iterGen = fibonacciSequenceGen();
    for (let i = 0; i < 100; i++) {
      expect(iter.next()).toEqual(iterGen.next());
    }
    expect(iter.return()).toEqual(iterGen.return());
  });
});