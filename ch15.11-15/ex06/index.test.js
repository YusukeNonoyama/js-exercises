import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // localStorageを削除した状態から毎回テスト開始
    await page.goto("ch15.11-15/ex06/index.html");
    await page.evaluate(() => sessionStorage.clear());
});

test("ToDoアイテムを追加", async ({ page }) => {
    await page.fill("#new-todo", "研修の予習範囲を読む");
    await page.click('button[type="submit"]');

    const items = page.locator("#todo-list li");
    await expect(items).toHaveCount(1);

    await expect(items.first().locator("label")).toHaveText("研修の予習範囲を読む");

    const stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("todoList")));
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe("研修の予習範囲を読む");
});

test("ToDoアイテムのトグル変更の反映", async ({ page }) => {
    await page.fill("#new-todo", "研修の練習問題を完了する");
    await page.click('button[type="submit"]');

    const checkbox = page.locator("#todo-list li input[type='checkbox']");

    // トグルのチェックを付ける
    await checkbox.check();
    let stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("todoList")));
    expect(stored[0].status).toBe("completed");

    // トグルのチェックを外す
    await checkbox.uncheck();
    stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("todoList")));
    expect(stored[0].status).toBe("active");
});

test("ToDoアイテムの削除", async ({ page }) => {
    await page.fill("#new-todo", "研修課題を見直す");
    await page.click('button[type="submit"]');

    const deleteBtn = page.locator("#todo-list li button");
    await deleteBtn.click();

    await expect(page.locator("#todo-list li")).toHaveCount(0);

    const stored = await page.evaluate(() => JSON.parse(sessionStorage.getItem("todoList")));
    expect(stored.length).toBe(0);
});

test("リロード時にsessionStorageにあるデータを読込み", async ({ page }) => {
    await page.evaluate(() => {
        sessionStorage.setItem(
            "todoList",
            JSON.stringify([
                { id: 1, name: "研修に出席する", status: "active" }
            ])
        );
    });

    await page.reload();

    const items = page.locator("#todo-list li");
    await expect(items).toHaveCount(1);
    await expect(items.first().locator("label")).toHaveText("研修に出席する");
});
