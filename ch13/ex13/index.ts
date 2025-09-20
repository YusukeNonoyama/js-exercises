// ch12/ex06のコピー

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

type Result = {
  path: string;
  isDirectory: boolean;
};

export async function* walk(
  rootPath: string,
): AsyncGenerator<Result, void, unknown> {
  let result;
  try {
    result = readdirSync(rootPath);
  } catch (e) {
    throw new Error("directroy does not exist");
  }
  for await (const item of result) {
    const itemFullPath = join(rootPath, item);
    const itemStat = statSync(itemFullPath);
    if (itemStat.isDirectory()) {
      yield {
        path: itemFullPath,
        isDirectory: true,
      };
      yield* walk(itemFullPath);
    }
    if (itemStat.isFile()) {
      yield {
        path: itemFullPath,
        isDirectory: false,
      };
    }
  }
}

for await (const elem of walk("ch13/ex13")) {
  console.log(elem);
}

console.log(async () => await walk("ch13/ex13/notExist").next());
