import { readdirSync, statSync } from "node:fs"

type Result = {
    path: string,
    isDirectory: boolean
}

export function* walk(rootPath: string): Generator<Result, void, unknown> {
    const result = readdirSync(rootPath);
    for (const item of result) {
        const itemFullPath = rootPath + "/" + item;
        const itemStat = statSync(itemFullPath);
        if (itemStat.isDirectory()) {
            yield {
                path: itemFullPath,
                isDirectory: true,
            }
            yield* walk(itemFullPath);
        }
        if (itemStat.isFile()) {
            yield {
                path: itemFullPath,
                isDirectory: false,
            }
        }
    }
}

const rootPath = "ch12/ex06"
const iter = walk(rootPath);
console.log([...iter]);
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
