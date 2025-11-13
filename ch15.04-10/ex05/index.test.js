import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex05/index.html");
});

test('カスタム要素 inline-circle1 に border-width: 1px が正しく追加されている', async ({ page }) => {
    const borderWidth1 = await page.evaluate(() => {
        const el = document.querySelector('#inline-circle1');
        return getComputedStyle(el).borderWidth;
    });
    expect(borderWidth1).toBe('1px');
});

test('カスタム要素 inline-circle2 に border-width: 5px が正しく追加されている', async ({ page }) => {
    const borderWidth2 = await page.evaluate(() => {
        const el = document.querySelector('#inline-circle2');
        return getComputedStyle(el).borderWidth;
    });
    expect(borderWidth2).toBe('5px');
});
