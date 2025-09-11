import { openSync, readSync, closeSync } from "node:fs";

export function* readLines(filePath: string) {
  const bufferSize = 50;
  const buffer = Buffer.alloc(bufferSize);
  const fd = openSync(filePath, "r");
  let startPosition = 0;
  let previouLines = "";
  try {
    while (true) {
      const bytesRead = readSync(fd, buffer as Uint8Array, 0, bufferSize, startPosition);
      if (bytesRead === 0) {
        // 最後の行のyield
        if (previouLines.length > 0) {
          yield previouLines;
        }
        break;
      }
      const data = buffer.toString("utf-8", 0, bytesRead);
      const result = data.split("\n");

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
