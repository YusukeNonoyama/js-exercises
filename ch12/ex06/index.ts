import { readdirSync, statSync } from "node:fs"
import { join } from "node:path";

type Result = {
    path: string,
    isDirectory: boolean
}

export function* walk(rootPath: string): Generator<Result, void, unknown> {
    let result;
    try {
        result = readdirSync(rootPath);
    } catch (e) {
        throw new Error("directroy does not exist")
    }
    for (const item of result) {
        const itemFullPath = join(rootPath, item);
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

