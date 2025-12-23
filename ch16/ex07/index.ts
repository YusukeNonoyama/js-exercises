import * as fs from "fs";

export function checkEntry(file: string) {
  let stats: fs.Stats | undefined;
  try {
    stats = fs.statSync(file);
  } catch (e) {
    throw new Error("invalid input");
  }

  if (stats.isFile()) {
    return "file";
  } else if (stats.isDirectory()) {
    return "directory";
  } else {
    return "something else";
  }
}
