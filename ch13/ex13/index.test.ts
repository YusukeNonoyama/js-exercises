import { walk } from "./index.ts"
import { openSync, closeSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

describe('walk()', () => {
    const rootPath = "ch13/ex13/tempDir";
    beforeEach(() => {
        if (existsSync(rootPath)) rmSync(rootPath, { recursive: true });
    });
    afterEach(() => {
        if (existsSync(rootPath)) rmSync(rootPath, { recursive: true });
    });
    test('存在するパスの全てのファイルとフォルダを出力する', async () => {
        // テスト対象のファイルとフォルダを作成
        mkdirSync(rootPath);
        const dirsPath = [
            "dirA",
            "dirB",
            "dirB/dirC",
        ];
        const filesPath = [
            "dirA/index.ts",
            "dirB/index.ts",
            "dirB/dirC/index.ts",
        ]
        for (const path of dirsPath) {
            mkdirSync(join(rootPath, path));
        }
        for (const path of filesPath) {
            closeSync(openSync(join(rootPath, path), 'w'));
        }

        // テスト対象のwalk関数実行
        const result = [];
        for await (const elem of walk(rootPath)) {
            result.push(elem);
        }
        expect(result).toEqual([
            { path: 'ch13/ex13/tempDir/dirA', isDirectory: true },
            { path: 'ch13/ex13/tempDir/dirA/index.ts', isDirectory: false },
            { path: 'ch13/ex13/tempDir/dirB', isDirectory: true },
            { path: 'ch13/ex13/tempDir/dirB/dirC', isDirectory: true },
            { path: 'ch13/ex13/tempDir/dirB/dirC/index.ts', isDirectory: false },
            { path: 'ch13/ex13/tempDir/dirB/index.ts', isDirectory: false },
        ]);
    });
    test('存在しないパスでエラーを返す', async () => {
        const wrongPath = "ch13/ex13/notExist";
        await expect(async () => await walk(wrongPath).next()).rejects.toThrow(Error);
    });
    test('パスではない文字列でエラーを返す', async () => {
        await expect(async () => await walk("This is not a path").next()).rejects.toThrow(Error);
    });
    test('空のディレクトリのパス', async () => {
        mkdirSync(rootPath);
        const result = [];
        for await (const elem of walk(rootPath)) {
            result.push(elem);
        }
        expect(result).toEqual([]);
    });
});
