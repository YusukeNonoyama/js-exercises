import { expect, test } from "@playwright/test";

test.describe("E2E test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.01-03/ex14");
  });

  test("all => food => stationery => all", async ({ page }) => {
    let items;
    let count;

    await page.getByRole("combobox").selectOption("all");
    expect(await page.getByRole("listitem").count()).toBe(3);

    await page.getByRole("combobox").selectOption("food");
    items = page.getByRole("listitem");
    count = await items.count();
    expect(count).toBe(1);
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const text = await item.getAttribute("data-category");
      expect(text).toBe("food");
    }

    await page.getByRole("combobox").selectOption("stationery");
    items = page.getByRole("listitem");
    count = await items.count();
    expect(count).toBe(2);
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const text = await item.getAttribute("data-category");
      expect(text).toBe("stationery");
    }

    await page.getByRole("combobox").selectOption("all");
    expect(await page.getByRole("listitem").count()).toBe(3);
  });

  test("all => stationery=> food => all", async ({ page }) => {
    let items;
    let count;

    await page.getByRole("combobox").selectOption("all");
    expect(await page.getByRole("listitem").count()).toBe(3);

    await page.getByRole("combobox").selectOption("stationery");
    items = page.getByRole("listitem");
    count = await items.count();
    expect(count).toBe(2);
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const text = await item.getAttribute("data-category");
      expect(text).toBe("stationery");
    }

    await page.getByRole("combobox").selectOption("food");
    items = page.getByRole("listitem");
    count = await items.count();
    expect(count).toBe(1);
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const text = await item.getAttribute("data-category");
      expect(text).toBe("food");
    }

    await page.getByRole("combobox").selectOption("all");
    expect(await page.getByRole("listitem").count()).toBe(3);
  });
});
