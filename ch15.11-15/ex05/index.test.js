import { test, expect } from "@playwright/test";

// IndexedDBからオブジェクトを読んで返すヘルパー関数
async function readIndexedDB(page) {
  return await page.evaluate(async () => {
    const STORE_NAME = "todos";

    return new Promise((resolve, reject) => {
      const request = indexedDB.open("todoDB");

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const getAllReq = store.getAll();

        getAllReq.onerror = () => reject(getAllReq.error);
        getAllReq.onsuccess = () => resolve(getAllReq.result);
      };
    });
  });
}

// DBを削除するヘルパー関数
async function clearIndexedDB(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase("todoDB");
      req.onsuccess = () => resolve();
      req.onerror = () => reject();
      req.onblocked = () => resolve(); // 他のブラウザ等が使用中でも強制消去。TODO:なぜこれがないと止まる？
    });
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/ch15.11-15/ex05/index.html");
  await clearIndexedDB(page);
  await page.reload();
});

test("ToDoアイテムを追加", async ({ page }) => {
  await page.fill("#new-todo", "研修の予習範囲を読む");
  await page.click('button[type="submit"]');

  // DOMへの追加
  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(1);
  await expect(items.first().locator("label")).toHaveText("研修の予習範囲を読む");

  // IndexedDBへの追加
  const stored = await readIndexedDB(page);
  expect(stored.length).toBe(1);
  expect(stored[0].name).toBe("研修の予習範囲を読む");
});

test("ToDoアイテムのトグル変更の反映", async ({ page }) => {
  await page.fill("#new-todo", "研修の練習問題を完了する");
  await page.click('button[type="submit"]');

  const checkbox = page.locator("#todo-list li input[type='checkbox']");

  await checkbox.check();
  let stored = await readIndexedDB(page);
  expect(stored[0].status).toBe("completed");

  await checkbox.uncheck();
  stored = await readIndexedDB(page);
  expect(stored[0].status).toBe("active");
});

test("ToDoアイテムの削除", async ({ page }) => {
  await page.fill("#new-todo", "研修課題を見直す");
  await page.click('button[type="submit"]');

  const deleteBtn = page.locator("#todo-list li button");
  await deleteBtn.click();

  await expect(page.locator("#todo-list li")).toHaveCount(0);

  const stored = await readIndexedDB(page);
  expect(stored.length).toBe(0);
});

test("リロード時にIndexedDBにあるデータを読込み", async ({ page }) => {
  // IndexedDBにテスト用のデータを書き込む
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const request = indexedDB.open("todoDB", 1);

      request.onerror = () => reject();
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["todos"], "readwrite");
        const store = transaction.objectStore("todos");
        store.put({ id: 1, name: "研修に出席する", status: "active" });
        transaction.oncomplete = () => resolve();
      };

      request.onupgradeneeded = function () {
        const db = request.result;
        db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
      };
    });
  });

  await page.reload();

  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(1);
  await expect(items.first().locator("label")).toHaveText("研修に出席する");
});

test("変更内容を他のタブへ自動反映する", async ({ browser }) => {
  // ページを１つ立ち上げる
  const context = await browser.newContext();
  const pageA = await context.newPage();
  await pageA.goto("/ch15.11-15/ex05/index.html");
  await clearIndexedDB(pageA);
  await pageA.reload();

  // 同じオリジンの別のページ立ち上げる
  const pageB = await context.newPage();
  await pageB.goto("/ch15.11-15/ex05/index.html");

  // １つのページにアイテムを更新
  await pageA.fill("#new-todo", "アンケートを書く");
  await pageA.click('button[type="submit"]');

  // 別のページに反映されるか確認
  const itemInB = pageB.locator("#todo-list li label");
  await expect(itemInB).toHaveText("アンケートを書く");
});

