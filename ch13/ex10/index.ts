import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchSumOfFileSizes(path: string, callback: Function) {
  const files = await fsPromises.readdir(path);
  const fileSizes = await Promise.all(
    files.map(async (file) => {
      const stats = await fsPromises.stat(join(path, file));
      return callback(stats.size);
    }),
  );
  return fileSizes.reduce((acc, val) => acc + val, 0);
}
