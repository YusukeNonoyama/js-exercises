import { join } from "path";
import * as fsPromises from "node:fs/promises";

export async function fetchFirstFileSize(path: string, callback: Function) {
  const files = await fsPromises.readdir(path);
  if (files.length === 0) {
    throw new Error("no files found");
  }
  const stats = await fsPromises.stat(join(path, files[0]));
  return callback(stats.size);
}

export async function fetchSumOfFileSizes(path: string, callback: Function) {
  const files = await fsPromises.readdir(path);
  let total = 0;
  const rest = [...files];
  async function iter(): Promise<any> {
    if (rest.length === 0) {
      console.log("total", total);
      console.log("total callback", callback(total));
      return callback(total);
    }
    const next = rest.pop();
    const stats = await fsPromises.stat(join(path, next as string));
    total += stats.size;
    return iter();
  }
  return iter();
}
