import { lstat } from "fs/promises";

export async function checkEntry(
  file: string,
): Promise<"file" | "directory" | "something else"> {
  let stats;
  try {
    // 非同期にstatsを取得（lstat()だとシンボリックリンクの場合はリンク先を辿らない）
    stats = await lstat(file);
  } catch {
    throw new Error("invalid input");
  }

  // statsの種類に応じて返り値を変える
  if (stats.isFile()) {
    return "file";
  } else if (stats.isDirectory()) {
    return "directory";
  } else {
    // シンボリックリンクの場合
    return "something else";
  }
}

