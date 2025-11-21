import { test, expect } from "@playwright/test";

/**
 * Helper: read all todos from IndexedDB inside the browser context
 */
async function readIndexedDB(page) {
  return await page.evaluate(async () => {
    const DB_NAME = "todoDB";
    const STORE_NAME = "todos";

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction([STORE_NAME], "readonly");
        const store = tx.objectStore(STORE_NAME);
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => resolve(getAllReq.result);
        getAllReq.onerror = () => reject(getAllReq.error);
      };

      request.onerror = () => reject(request.error);
    });
  });
}

/**
 * Helper: clear IndexedDB before each test
 */
async function clearIndexedDB(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase("todoDB");
      req.onsuccess = resolve;
      req.onerror = reject;
      req.onblocked = resolve; // Some browsers block but still delete next load
    });
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/ch15.11-15/ex05/index.html");
  await clearIndexedDB(page);
  await page.reload(); // ensure DB deletion takes effect
});

/* ------------------------------
 *   1. Add ToDo item
 * ------------------------------ */
test("ToDoアイテムを追加", async ({ page }) => {
  await page.fill("#new-todo", "研修の予習範囲を読む");
  await page.click('button[type="submit"]');

  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(1);
  await expect(items.first().locator("label")).toHaveText("研修の予習範囲を読む");

  const stored = await readIndexedDB(page);
  expect(stored.length).toBe(1);
  expect(stored[0].name).toBe("研修の予習範囲を読む");
});

/* ------------------------------
 *   2. Toggle update
 * ------------------------------ */
test("ToDoアイテムのトグル変更の反映", async ({ page }) => {
  await page.fill("#new-todo", "研修の練習問題を完了する");
  await page.click('button[type="submit"]');

  const checkbox = page.locator("#todo-list li input[type='checkbox']");

  // toggle ON
  await checkbox.check();
  let stored = await readIndexedDB(page);
  expect(stored[0].status).toBe("completed");

  // toggle OFF
  await checkbox.uncheck();
  stored = await readIndexedDB(page);
  expect(stored[0].status).toBe("active");
});

/* ------------------------------
 *   3. Delete ToDo
 * ------------------------------ */
test("ToDoアイテムの削除", async ({ page }) => {
  await page.fill("#new-todo", "研修課題を見直す");
  await page.click('button[type="submit"]');

  const deleteBtn = page.locator("#todo-list li button");
  await deleteBtn.click();

  await expect(page.locator("#todo-list li")).toHaveCount(0);

  const stored = await readIndexedDB(page);
  expect(stored.length).toBe(0);
});

/* ------------------------------
 *   4. Reload should read IndexedDB data
 * ------------------------------ */
test("リロード時にIndexedDBにあるデータを読込み", async ({ page }) => {
  // Write mock data directly into IndexedDB
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const req = indexedDB.open("todoDB", 1);

      req.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("todos")) {
          db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
        }
      };

      req.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction(["todos"], "readwrite");
        const store = tx.objectStore("todos");
        store.put({ id: 1, name: "研修に出席する", status: "active" });
        tx.oncomplete = resolve;
      };

      req.onerror = reject;
    });
  });

  await page.reload();

  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(1);
  await expect(items.first().locator("label")).toHaveText("研修に出席する");
});

/* ------------------------------
 *   5. BroadcastChannel sync between tabs
 * ------------------------------ */
test("変更内容を他のタブへ自動反映する", async ({ browser }) => {
  const context = await browser.newContext();

  const pageA = await context.newPage();
  await pageA.goto("/ch15.11-15/ex05/index.html");
  await clearIndexedDB(pageA);
  await pageA.reload();

  const pageB = await context.newPage();
  await pageB.goto("/ch15.11-15/ex05/index.html");

  // Add todo from tab A
  await pageA.fill("#new-todo", "アンケートを書く");
  await pageA.click('button[type="submit"]');

  // Tab B should receive BroadcastChannel update and reload
  const itemInB = pageB.locator("#todo-list li label");
  await expect(itemInB).toHaveText("アンケートを書く");
});

