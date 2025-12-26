import request from "supertest";
import { app } from "./app.js";

describe("サーバーのテスト", () => {

    test("ミラー用のパス /test/mirror", async () => {
        const res = await request(app)
            .get("/test/mirror")
            .expect("Content-Type", "text/plain; charset=UTF-8")
            .expect(200)
        expect(res.text).toContain("GET /test/mirror HTTP/1.1");
    });

    test("存在するファイルを読み込むと成功する /hello.txt", async () => {
        const res = await request(app)
            .get("/hello.txt")
            .expect(200)
            .expect("Content-Type", "text/plain");

        expect(res.text).toBe("Hello from hello.txt");
    });

    test("存在しないファイルを読み込むと失敗する", async () => {
        const res = await request(app)
            .get("/does-not-exist.txt")
            .expect(404)
            .expect("Content-Type", "text/plain; charset=UTF-8");

        expect(res.text.length).toBeGreaterThan(0);
    });

    test("上位階層のファイル指定はできない", async () => {
        await request(app)
            .get("/../package.json")
            .expect(404);
    });
});
