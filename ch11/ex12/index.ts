import { readFile } from 'fs/promises';

// 独自のエラーを定義
class FileSizeError extends Error {
    fileSize: number;
    constructor(text: string, fileSize: number) {
        super(`${text}: ${fileSize}`);
        this.fileSize = fileSize;
    }
    get name() { return "FileSizeError" }
}

// エラーの動作確認
const error = new FileSizeError("file size is over the limit ", 1425);
console.log(error.name);
console.log(error.fileSize);

// 定義したエラーを発生させる
async function checkFileSize(path: string) {
    const fileSizeLimit = 1000;
    const data = await readFile(path, 'utf8');
    const sizeInBytes = Buffer.byteLength(data, 'utf8');
    console.log('Size in bytes:', sizeInBytes);
    if (sizeInBytes > fileSizeLimit) {
        throw new FileSizeError(`file size is over the limit`, sizeInBytes)
    }
};
const text = 'ch11/ex11/index.js'
checkFileSize(text);

// 実行結果
// npm run exec ch11/ex12/index.ts

// > preset-ts@1.0.0 exec
// > npx node --loader ts-node/esm ch11/ex12/index.ts

// (node:28808) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
// --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
// (Use `node --trace-warnings ...` to show where the warning was created)
// (node:28808) [DEP0180] DeprecationWarning: fs.Stats constructor is deprecated.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// FileSizeError
// 1425
// Size in bytes: 1425
// file:///home/nonoyama/js/js-exercises/ch11/ex12/index.ts:19
//         throw new FileSizeError(`file size is over the limit`, sizeInBytes);
//               ^

// FileSizeError: file size is over the limit: 1425
//     at checkFileSize (file:///home/nonoyama/js/js-exercises/ch11/ex12/index.ts:19:15) {
//   fileSize: 1425
// }

// Node.js v22.16.0