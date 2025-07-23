import { readdir, stat } from "./index.ts";
import * as fs from "node:fs";

describe('readdir()', () => {
    it('fs.readdir()と同じ結果を返す', async () => {
        const testDir = './ch13';
        let expected;
        fs.readdir(testDir, (err, files) => {
            expected = files;
        })
        const result = await readdir(testDir);
        expect(result).toEqual(expected);
    });

    it('フォルダが存在しない場合失敗する', async () => {
        const badPath = '/non/existent/path';
        await expect(readdir(badPath)).rejects.toThrow();
    });
});

describe('stat()', () => {
    it('fs.stat()と同じ結果を返す', async () => {
        const testDir = './ch13';
        let expected;
        fs.stat(testDir, (err, files) => {
            expected = files;
        })
        const result = await stat(testDir);
        expect(result).toEqual(expected);
    });

    it('フォルダが存在しない場合失敗する', async () => {
        const badPath = '/non/existent/path';
        await expect(stat(badPath)).rejects.toThrow();
    });
});
