import { expect, test } from './fixtures';

test.describe('home page', () => {
  test('has the sections the navigation links to', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('Ask a question. Draw the cards.');
    await expect(page.locator('#features')).toBeAttached();
    await expect(page.locator('#spreads')).toBeAttached();
    await expect(page.locator('#spreads article')).toHaveCount(3);
    await expect(page.getByText('This app is made for entertainment')).toBeVisible();
  });

  test('shows «coming soon» instead of store badges while there are no store links', async ({ page }) => {
    await page.goto('/ru/');

    await expect(page.getByText('Скоро в App Store')).toHaveCount(2);
    await expect(page.getByText('Скоро в Google Play')).toHaveCount(2);
    await expect(page.locator('img[src^="/badges/"]')).toHaveCount(0);
  });

  test('hides the screenshot gallery until screenshots exist', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('img[src^="/screenshots/"]')).toHaveCount(0);
  });

  test('header link to a section scrolls there from another page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/es/support/');
    await page.getByRole('banner').locator('a[href="/es/#spreads"]').filter({ visible: true }).first().click();

    await expect(page).toHaveURL('/es/#spreads');
    await expect(page.locator('#spreads h2')).toBeInViewport();
  });

  test('card images load the small file and do not shift the layout', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('img[src*="/cards/"]').first();

    await expect(card).toHaveAttribute('width', '120');
    expect(await card.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });
});
