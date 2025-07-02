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