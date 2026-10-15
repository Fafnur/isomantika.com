import { expect, test } from '@playwright/test';

test.describe('support', () => {
  test('FAQ items open independently', async ({ page }) => {
    await page.goto('/support/');
    const items = page.locator('main details');

    await expect(items).toHaveCount(9);
    await items.nth(0).locator('summary').click();
    await items.nth(1).locator('summary').click();

    await expect(items.nth(0)).toHaveAttribute('open', '');
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await expect(items.nth(1)).toContainText('midnight UTC');
  });

  test('links to the contact form, email and account deletion', async ({ page }) => {
    await page.goto('/ru/support/');

    await expect(page.getByRole('link', { name: 'Написать нам' })).toHaveAttribute('href', '/ru/contact/');
    await expect(page.locator('main a[href="mailto:support@mantikai.com"]')).toBeVisible();
    await expect(page.locator('main a[href="/ru/delete-account/"]')).toBeAttached();
  });
});

test.describe('delete account', () => {
  test('explains the steps and offers a request without the app', async ({ page }) => {
    await page.goto('/es/delete-account/');

    await expect(page.locator('main ol li')).toHaveCount(3);
    await expect(page.getByRole('link', { name: 'Solicitar la eliminación' })).toHaveAttribute(
      'href',
      '/es/contact/?topic=account_deletion',
    );
    await expect(page.locator('main a[href^="mailto:support@mantikai.com?subject="]')).toBeVisible();

    await page.locator('main a[href="/es/privacy/#how-long-we-keep-data"]').click();
    await expect(page).toHaveURL('/es/privacy/#how-long-we-keep-data');
    await expect(page.locator('#how-long-we-keep-data')).toBeInViewport();
  });
});
