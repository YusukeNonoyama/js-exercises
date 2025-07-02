export function* counterGen(max: number): Generator<number> {
    let c;
    for (c = 1; c <= max; c++) {
        try {
            yield c;
        } catch (e) {
            console.log("reset done");
            c = 0;
        }
    }
    console.log("counterGen: finally");
}

// const gen = counterGen(5);

// console.log(gen.next()); // 1
// console.log(gen.next()); // 2
// console.log(gen.next()); // 3
// console.log(gen.throw("reset")); // 1
// console.log(gen.next()); // 2
// console.log(gen.next()); // 3
// console.log(gen.next()); // 4
// console.log(gen.next()); // 5
// console.log(gen.next()); // 終了
