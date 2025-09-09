export function fibonacciSequence() {
  let x = 0,
    y = 1;
  let temp = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      temp = y;
      [x, y] = [y, x + y]; // Note: destructuring assignment
      return { value: temp, done: false };
    },
    return() {
      return { done: true, value: undefined };
    },
    throw(e: ErrorConstructor) {
      throw e;
    },
  };
}

export function* fibonacciSequenceGen() {
  let x = 0,
    y = 1;
  for (; ;) {
    yield y;
    [x, y] = [y, x + y]; // Note: destructuring assignment
  }
}
