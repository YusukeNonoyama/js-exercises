import { join } from "path";
import * as fsPromises from "node:fs/promises";

export function fetchFirstFileSize(path: string, callback: Function) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) {
        throw new Error("no files found");
      }
      return fsPromises.stat(join(path, files[0])).then((stats) => {
        return callback(stats.size);
      });
    })
    .catch(() => {
      throw new Error("no files found");
    });
}

export function fetchSumOfFileSizes(path: string, callback: Function) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      let total = 0;
      const rest = [...files];
      function iter(): any {
        if (rest.length === 0) {
          console.log("total", total);
          console.log("total callback", callback(total));
          return callback(total);
        }
        const next = rest.pop();
        return fsPromises.stat(join(path, next as string)).then((stats) => {
          total += stats.size;
          return iter();
        });
      }
      return iter();
    })
    .catch(() => {
      throw new Error("no files found");
    });
}
