function* integers() {
    let i = 2;
    for (; ;) {
        yield i++;
    }
}

export function* primes(): Generator<number, void, unknown> {
    function* sieve(intIter: IterableIterator<number>): Generator<number, void, unknown> {
        const prime: number = intIter.next().value;
        // console.log(`${prime}`, ": 1");
        yield prime;
        // console.log(`${prime}`, ": 2");
        // 再帰的にprimeを使った篩が増えていく、分解して順番確認
        yield* sieve(filter(intIter, x => x % prime !== 0));
        // for (const item of sieve(filter(intIter, x => x % prime !== 0))) {
        // console.log(`${prime}`, ": 3");
        // yield item;
        // console.log(`${prime}`, ": 4");
        // }
    }
    // 素数の倍数を振るい落とす再帰ジェネレーター
    yield* sieve(integers());
    // for (const item of sieve(integers())) {
    // yield item;
    // console.log("yielded===============");
    // }
}

function filter(iterable: IterableIterator<number>, predicate: (x: number) => boolean) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            for (; ;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    }
}

// const p = primes();
// console.log(p.next().value); // 2
// console.log(p.next().value); // 3
// console.log(p.next().value); // 5
// console.log(p.next().value); // 7
// console.log(p.next().value); // 11
// console.log(p.next().value);
// console.log(p.next().value);
// console.log(p.next().value);
// console.log(p.next().value);
// console.log(p.next().value);

