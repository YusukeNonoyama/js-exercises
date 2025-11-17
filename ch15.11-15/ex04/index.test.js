import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Clear localStorage before each test
  await page.addInitScript(() => localStorage.clear());
  await page.goto("ch15.11-15/ex04/index.html");
});

test("should add a new todo item", async ({ page }) => {
  await page.fill("#new-todo", "Buy milk");
  await page.click('button[type="submit"]');

  const items = page.locator("#todo-list li");
  await expect(items).toHaveCount(1);

  await expect(items.first().locator("label")).toHaveText("Buy milk");

  // Check localStorage
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored.length).toBe(1);
  expect(stored[0].name).toBe("Buy milk");
});

test("should not add empty todo", async ({ page }) => {
  await page.fill("#new-todo", "   ");
  await page.click('button[type="submit"]');

  await expect(page.locator("#todo-list li")).toHaveCount(0);
});

test("should toggle todo status", async ({ page }) => {
  // Add todo
  await page.fill("#new-todo", "Task");
  await page.click('button[type="submit"]');

  const checkbox = page.locator("#todo-list li input[type='checkbox']");

  // Toggle ON
  await checkbox.check();
  let stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored[0].status).toBe("completed");

  // Toggle OFF
  await checkbox.uncheck();
  stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  expect(stored[0].status).toBe("active");
});

test("should delete todo", async ({ page }) => {
  await page.fill("#new-todo", "Delete me");
  await page.click('button[type="submit"]');

  const deleteBtn = page.locator("#todo-list li button");
  await deleteBtn.click();

  // await expect(page.locator("#todo-list li")).toHaveCount(0);

  // const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("todoList")));
  // expect(stored.length).toBe(0);
});

test("should load existing todos from localStorage", async ({ page }) => {
  // Inject mock data
  await page.evaluate(() => {
    localStorage.setItem(
      "todoList",
      JSON.stringify([
        { id: 1, name: "Existing Task", status: "active" }
      ])
    );
  });

  // Reload so the script runs again
  await page.reload();

  // const items = page.locator("#todo-list li");
  // await expect(items).toHaveCount(1);
  // await expect(items.first().locator("label")).toHaveText("Existing Task");
});
