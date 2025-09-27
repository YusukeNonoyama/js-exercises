import { test, expect } from '@playwright/test';

test('border-width is applied correctly to inline-circle', async ({ page }) => {
    await page.goto("/ch15.04-10/ex05/index.html");

    const borderWidth1 = await page.evaluate(() => {
        const el = document.querySelector('#inline-circle1');
        return getComputedStyle(el).borderWidth;
    });
    expect(borderWidth1).toBe('1px');

    const borderWidth2 = await page.evaluate(() => {
        const el = document.querySelector('#inline-circle2');
        return getComputedStyle(el).borderWidth;
    });
    expect(borderWidth2).toBe('5px');
});
