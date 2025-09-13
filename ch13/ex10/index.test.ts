import { fetchSumOfFileSizes } from "./index.ts";
import { join } from "path";
import {
  openSync,
  closeSync,
  mkdirSync,
  existsSync,
  rmSync,
  writeFileSync,
} from "node:fs";

describe("fetchSumOfFileSizes()", () => {
  const dirPath = "ch13/ex04/tempDir";
  beforeEach(() => {
    if (existsSync(dirPath)) rmSync(dirPath, { recursive: true });
  });
  afterEach(() => {
    if (existsSync(dirPath)) rmSync(dirPath, { recursive: true });
  });
  it("ファイルがない場合、fetchSumOfFileSizes()で0が返る", async () => {
    mkdirSync(dirPath);
    const result = await fetchSumOfFileSizes(dirPath, (statSize: number) => {
      return statSize;
    }).catch((e) => {
      return e;
    });
    expect(result).toEqual(0);
  });
  it("ファイルが1つの場合、fetchSumOfFileSizes()でファイルサイズが返る", async () => {
    const filesPath = join(dirPath, "index.ts");
    mkdirSync(dirPath);
    closeSync(openSync(filesPath, "w"));
    writeFileSync(filesPath, "123");
    const result = await fetchSumOfFileSizes(dirPath, (statSize: number) => statSize).catch(e => e);
    expect(result).toEqual(3);
  });
  it("ファイルが3つの場合、fetchSumOfFileSizes()でファイルサイズが返る", async () => {
    mkdirSync(dirPath);
    const files = [
      ["index.ts", "123"],
      ["index2.ts", "4"],
      ["index3.ts", "abc"],
    ];
    for (const file of files) {
      closeSync(openSync(join(dirPath, file[0]), "w"));
      writeFileSync(join(dirPath, file[0]), file[1]);
    }
    const result = await fetchSumOfFileSizes(dirPath, (statSize: number) => {
      return statSize;
    }).catch((e) => {
      return e;
    });
    // ファイルの中の合計文字数をカウント（一旦、簡単のため文字数＝バイト数の前提）
    const totalLetterCount = files.reduce((acc, file) => acc + file[1].length, 0);
    expect(result).toEqual(totalLetterCount);
  });
  it("fetchSumOfFileSizes()の入力パスが存在しない場合、プロミスは失敗する", async () => {
    await expect(fetchSumOfFileSizes("no/existent/path", (statsSize: number) => statsSize)).rejects.toThrow();
  });
});
