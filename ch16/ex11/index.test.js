import request from "supertest";
import { server } from "./app.js";

const PORT = 8001;
const BASE_URL = `http://localhost:${PORT}`;

beforeAll(() => {
    server.listen(PORT);
});

afterAll(() => {
    server.close();
});

describe("Serverのテスト", () => {
    test("GET / のHTML表示", async () => {

        // URL指定でもsupertestできる
        const res = await request(BASE_URL).get("/");

        expect(res.status).toBe(200);
        expect(res.text).toContain('<form action="/greeting" method="POST">');
    });

    test("POST /greeting の正常レスポンス", async () => {
        const res = await request(BASE_URL)
            .post("/greeting")
            .send("name=Yusuke&greeting=Hey");

        expect(res.status).toBe(200);
        expect(res.text).toContain("Received!");
        expect(res.text).toContain("Name: Yusuke");
        expect(res.text).toContain("Greeting: Hey");
    });

    test("GET /greeting の非対応メソッド", async () => {
        const res = await request(BASE_URL).get("/greeting");

        expect(res.status).toBe(405);
        expect(res.text).toContain("Method Not Allowed");
    });

    test("非対応パス", async () => {
        const res = await request(BASE_URL).get("/undefinedPath");

        expect(res.status).toBe(404);
        expect(res.text).toContain("Page Not Found");
    });
});
