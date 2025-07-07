import { openSync, readSync, closeSync } from 'node:fs'
import { writeFileSync } from 'node:fs'



export function* readLines(filePath: string) {
    const bufferSize = 50;
    const buffer = Buffer.alloc(bufferSize);
    const fd = openSync(filePath, "r");
    let startPosition = 0;
    let previouLines = "";
    try {
        while (true) {
            const bytesRead = readSync(fd, buffer, 0, bufferSize, startPosition);
            if (bytesRead === 0) {
                // 最後の行のyield
                if (previouLines.length > 0) {
                    yield previouLines;
                }
                break;
            }
            const data = buffer.toString('utf-8', 0, bytesRead);
            const result = data.split('\n');

            // 改行が含まれていれば要素１をyield
            if (result.length >= 2) {
                startPosition += result[0].length + 1;
                yield previouLines + result[0];
                previouLines = "";
                continue;
            }
            previouLines += data;
            startPosition += result[0].length;
        }
    } catch {
        console.log("error occurred");
    } finally {
        closeSync(fd);
    }
}

// // \nがバッファサイズ内にない時
// export function* readLines(filePath: string) {
//     const bufferSize = 50;
//     const buffer = Buffer.alloc(bufferSize);
//     const fd = openSync(filePath, "r");
//     let startPosition = 0;
//     let previouLines = "";
//     try {
//         while (true) {
//             const bytesRead = readSync(fd, buffer, 0, bufferSize, startPosition);
//             // console.log(bytesRead);
//             if (bytesRead === 0) break;
//             const data = buffer.toString('utf-8', 0, bytesRead);
//             const result = data.split('\n');
//             if (bytesRead === bufferSize && result.length === 1) {
//                 previouLines += data;
//                 startPosition += bufferSize;
//             }
//             startPosition += result[0].length + 1;
//             console.log("prev", previouLines);
//             console.log("num of newLines", result.length);
//             // if (!data) {
//             yield previouLines + result[0];
//             previouLines = "";
//             // }
//         }
//     } catch {
//         console.log("error occurred");
//     } finally {
//         console.log("file closed");
//         closeSync(fd);
//     }
// }

// for (let i = 0; i > 31; i++) {
//     closeSync(i);
// }
// const filePath = "ch12/ex05/inputFile.txt";
// const iter = readLines(filePath);
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// const iter2 = readLines(filePath);
// let count = 0;
// for (const value of iter2) {
//     console.log(value);
//     if (count >= 2) {
//         break;
//         // iter2.throw("stop iteration");
//     }
//     count++;
// }


// const TEST_FILE = './test_input.txt';

// const longLine = 'a'.repeat(200);
// const content = `${longLine}\nsecond line\n${longLine}`;
// writeFileSync(TEST_FILE, content, 'utf8');

// const lines = Array.from(readLines(TEST_FILE));

// console.log(lines);