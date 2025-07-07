import { walk } from "./index.ts"

describe('walk()', () => {
    beforeEach(() => {
    });
    afterEach(() => {
    });

    test('全てのファイルとフォルダを出力する', () => {
        // ここでファイルとフォルダを作ってそれをテスト対象とする
        const rootPath = "ch12/ex06"
        const result = [...walk(rootPath)];
        expect(result).toEqual([
            { path: 'ch12/ex06/dirA', isDirectory: true },
            { path: 'ch12/ex06/dirA/index.ts', isDirectory: false },
            { path: 'ch12/ex06/dirB', isDirectory: true },
            { path: 'ch12/ex06/dirB/dirC', isDirectory: true },
            { path: 'ch12/ex06/dirB/dirC/index.ts', isDirectory: false },
            { path: 'ch12/ex06/dirB/index.ts', isDirectory: false },
            { path: 'ch12/ex06/index.test.ts', isDirectory: false },
            { path: 'ch12/ex06/index.ts', isDirectory: false }
        ]);

    });
});
