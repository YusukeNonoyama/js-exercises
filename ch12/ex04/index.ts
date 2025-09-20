function* integers(): Generator<number, void, unknown> {
  let i = 2;
  while (true) {
    yield i++;
  }
}

function* filter(
  iterable: Iterable<number>,
  predicate: (x: number) => boolean,
): Generator<number, void, unknown> {
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}

export function* primes(): Generator<number, void, unknown> {
  function* sieve(
    intIterable: IterableIterator<number>,
  ): Generator<number, void, unknown> {
    const prime: number = intIterable.next().value; // フィルターされて残った次の値が返る
    yield prime; // ここで値を返す
    // primeを使った篩をwrapして階層がフィルターする階層が増えていく
    yield* sieve(filter(intIterable, (x) => x % prime !== 0));
  }
  // 整数のイテレーターを引数に再帰ジェネレーターを実行
  yield* sieve(integers());
}
