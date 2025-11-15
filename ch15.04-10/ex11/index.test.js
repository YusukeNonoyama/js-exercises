import { test, expect } from "@playwright/test";

test.describe("Todo App hashchange", () => {
    const BASE_URL = "http://localhost:3000/ch15.04-10/ex11/";
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test("新しいアイテムを加える", async ({ page }) => {
        await page.fill("#new-todo", "研修の予習範囲を読む");
        await page.click("#new-todo-form button");

        const items = page.locator("#todo-list li");
        await expect(items).toHaveCount(1);
        await expect(items.nth(0).locator("label")).toHaveText("研修の予習範囲を読む");
        await expect(items.nth(0)).not.toHaveClass(/completed/);
    });

    test("トグルをチェックするとcompletedになる", async ({ page }) => {
        await page.fill("#new-todo", "研修の練習問題を完了する");
        await page.click("#new-todo-form button");

        const firstToggle = page.locator("#todo-list li input.toggle").first();

        await firstToggle.check();
        await expect(page.locator("#todo-list li").first()).toHaveClass(/completed/);

        await firstToggle.uncheck();
        await expect(page.locator("#todo-list li").first()).not.toHaveClass(/completed/);
    });

    test("todoを削除する", async ({ page }) => {
        await page.fill("#new-todo", "研修課題を見直す");
        await page.click("#new-todo-form button");

        await expect(page.locator("#todo-list li")).toHaveCount(1);

        await page.click("#todo-list li button.destroy");

        await expect(page.locator("#todo-list li")).toHaveCount(0);
    });

    test("アクティブなtodosのみ表示する (#/active)", async ({ page }) => {
        await page.fill("#new-todo", "アクティブなTask");
        await page.click("#new-todo-form button");

        // Todo2: completed=true
        await page.fill("#new-todo", "完了したTask");
        await page.click("#new-todo-form button");

        // 完了にする
        await page.locator("#todo-list li input.toggle").nth(1).check();

        // hash 変更
        await page.goto(BASE_URL + "#/active");

        const items = page.locator("#todo-list li");
        await expect(items).toHaveCount(1);
        await expect(items.first().locator("label")).toHaveText("アクティブなTask");
    });

    test("完了したtodosのみ表示する (#/completed)", async ({ page }) => {
        // Todo1: active
        await page.fill("#new-todo", "アクティブなTask");
        await page.click("#new-todo-form button");

        // Todo2: completed
        await page.fill("#new-todo", "完了したTask");
        await page.click("#new-todo-form button");

        await page.locator("#todo-list li input.toggle").nth(1).check();

        await page.goto(BASE_URL + "#/completed");

        const items = page.locator("#todo-list li");
        await expect(items).toHaveCount(1);
        await expect(items.first().locator("label")).toHaveText("完了したTask");
    });

    test("全てのtodosを表示する (#/)", async ({ page }) => {
        await page.fill("#new-todo", "Task A");
        await page.click("#new-todo-form button");

        await page.fill("#new-todo", "Task B");
        await page.click("#new-todo-form button");

        await page.goto(BASE_URL + "#/");

        const items = page.locator("#todo-list li");
        await expect(items).toHaveCount(2);
    });
});
