import { walk } from "./index.ts";
import { openSync, closeSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

describe("walk()", () => {
  const rootPath = "ch12/ex06/tempDir";
  beforeEach(() => {
    if (existsSync(rootPath)) rmSync(rootPath, { recursive: true });
  });
  afterEach(() => {
    if (existsSync(rootPath)) rmSync(rootPath, { recursive: true });
  });
  test("存在するパスの全てのファイルとフォルダを出力する", () => {
    // テスト対象のファイルとフォルダを作成
    mkdirSync(rootPath);
    const dirsPath = ["dirA", "dirB", "dirB/dirC"];
    const filesPath = ["dirA/index.ts", "dirB/index.ts", "dirB/dirC/index.ts"];
    for (const path of dirsPath) {
      mkdirSync(join(rootPath, path));
    }
    for (const path of filesPath) {
      closeSync(openSync(join(rootPath, path), "w"));
    }

    // テスト対象のwalk関数実行
    const result = [...walk(rootPath)];
    expect(result).toEqual([
      { path: "ch12/ex06/tempDir/dirA", isDirectory: true },
      { path: "ch12/ex06/tempDir/dirA/index.ts", isDirectory: false },
      { path: "ch12/ex06/tempDir/dirB", isDirectory: true },
      { path: "ch12/ex06/tempDir/dirB/dirC", isDirectory: true },
      {
        path: "ch12/ex06/tempDir/dirB/dirC/index.ts",
        isDirectory: false,
      },
      { path: "ch12/ex06/tempDir/dirB/index.ts", isDirectory: false },
    ]);
  });
  test("存在しないパスでエラーを返す", () => {
    const wrongPath = "ch12/ex06/notExist";
    expect(() => walk(wrongPath).next()).toThrow(Error);
  });
  test("パスではない文字列でエラーを返す", () => {
    expect(() => walk("This is not a path").next()).toThrow(Error);
  });
  test("空のディレクトリのパス", () => {
    mkdirSync(rootPath);
    expect([...walk(rootPath)]).toEqual([]);
  });
});
