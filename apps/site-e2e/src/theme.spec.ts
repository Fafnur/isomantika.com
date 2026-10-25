import { AxeBuilder } from '@axe-core/playwright';

import { expect, test, waitForHydration } from './fixtures';

test.describe('theme', () => {
  test('is dark by default', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).not.toHaveClass(/theme-/);
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(23, 24, 43)');
  });

  test('the choice applies at once and before the first paint after a reload', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);

    await page.getByRole('banner').getByRole('button', { name: 'Choose theme' }).click();
    await page.getByRole('menuitemradio', { name: 'Light' }).click();
    await expect(page.locator('html')).toHaveClass(/theme-light/);
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(246, 239, 227)');

    await page.goto('/ru/support/');
    // Before hydration: set by the script in `index.html`.
    await expect(page.locator('html')).toHaveClass(/theme-light/);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#F6EFE3');
  });

  test('system follows the color scheme of the device', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.addInitScript(() => localStorage.setItem('isomantika.theme', 'system'));
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(246, 239, 227)');

    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(23, 24, 43)');
  });

  for (const url of ['/', '/privacy/', '/support/', '/contact/']) {
    test(`${url} in the light theme has no serious or critical axe violations`, async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('isomantika.theme', 'light'));
      await page.goto(url);
      await page.getByRole('contentinfo').waitFor();

      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      const blocking = violations
        .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
        .map((violation) => `${violation.id} (${violation.impact}): ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`);

      expect(blocking).toEqual([]);
    });
  }
});
