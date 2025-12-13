import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // localStorageを削除した状態から毎回テスト開始
  await page.goto("ch15.11-15/ex04/index.html");
  await page.evaluate(() => localStorage.clear());
});

test("ToDoアイテムを追加", async ({ page }) => {
  await page.fill("#new-todo", "研修の予習範囲を読む");
  await page.click('button[type="submit"]');
  await page.fill("#new-todo", "研修の練習問題を完了する");
  await page.click('button[type="submit"]');

  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(2);

  const labelList = ["研修の練習問題を完了する", "研修の予習範囲を読む"];

  await expect(items.nth(0).locator("label")).toHaveText("研修の練習問題を完了する");
  await expect(items.nth(1).locator("label")).toHaveText("研修の予習範囲を読む");

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored.length).toBe(2);
  expect(stored[0].name).toBe("研修の予習範囲を読む");
  expect(stored[1].name).toBe("研修の練習問題を完了する");
});

test("ToDoアイテムのトグル変更の反映", async ({ page }) => {
  await page.fill("#new-todo", "研修の練習問題を完了する");
  await page.click('button[type="submit"]');

  const checkbox = page.locator("#todo-list li input[type='checkbox']");

  // トグルのチェックを付ける
  await checkbox.check();
  let stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored[0].status).toBe("completed");

  // トグルのチェックを外す
  await checkbox.uncheck();
  stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored[0].status).toBe("active");
});

test("ToDoアイテムの削除", async ({ page }) => {
  await page.fill("#new-todo", "研修課題を見直す");
  await page.click('button[type="submit"]');

  // アイテムを削除する
  const deleteBtn = page.locator("#todo-list li button");
  await deleteBtn.click();

  await expect(page.locator("#todo-list li")).toHaveCount(0);

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored.length).toBe(0);
});

test("リロード時にlocalStorageにあるデータを読込み", async ({ page }) => {
  // LocalStorageに直接データを書き込み
  await page.evaluate(() => {
    localStorage.setItem(
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

// pageではなくbrowserコンテキストを操作する
test("変更内容を他のタブへ自動反映する", async ({ browser }) => {
  const context = await browser.newContext();

  // pageAを操作
  const pageA = await context.newPage();
  await pageA.goto("/ch15.11-15/ex04/index.html");
  await pageA.evaluate(() => localStorage.clear());

  // pageBを立ち上げ
  const pageB = await context.newPage();
  await pageB.goto("/ch15.11-15/ex04/index.html");

  // pageAにToDoを書き込み
  await pageA.fill("#new-todo", "アンケートを書く");
  await pageA.click('button[type="submit"]');

  // pageBに反映されていることを確認
  const itemInB = pageB.locator("#todo-list li label");
  await expect(itemInB).toHaveText("アンケートを書く");
});
