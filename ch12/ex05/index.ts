import { openSync, readSync, closeSync } from 'node:fs'

export function* readLines(filePath: string) {
    const int8 = new Int8Array(2);
    const a = openSync(filePath, "r");
    readSync(a, int8);
    closeSync(a);
}