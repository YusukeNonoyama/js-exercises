import { test, expect } from "@playwright/test";

test.describe("Integrity の機能確認", () => {
  test("integrity 値が正しい場合", async ({ page }) => {
    const logs = [];
    page.on("console", (msg) => logs.push(msg.text()));
    await page.goto("http://localhost:3000/index.html");

    console.log("logs:", logs);

    const jsLog = logs.find((log) =>
      log.includes("This line is from a JavaScript file."),
    );
    expect(jsLog).toBeDefined(); // console.log() の出力が得られずうまくいかない
  });

  test("integrity 値が間違っている場合", async ({ page }) => {
    const logs = [];
    page.on("console", (msg) => logs.push(msg.text()));

    await page.goto("http://localhost:3000/wrongIntegrity/index.html");

    const jsLog = logs.find((log) =>
      log.includes("This line is from a JavaScript file."),
    );
    expect(jsLog).toBeUndefined();
  });
});
