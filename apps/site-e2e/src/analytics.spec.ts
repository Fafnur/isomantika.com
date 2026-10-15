import { expect, test } from '@playwright/test';

const COUNTERS = /googletagmanager\.com|google-analytics\.com|mc\.yandex\.(ru|com)/;

// No counter IDs are configured yet (SITE.analytics is empty): nothing is asked and nothing is loaded.
// When IDs appear, extend with: no requests before consent, requests after «Accept», none after «Decline» and reload.
test('without counter IDs there is no banner, no settings and no requests to counters', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (COUNTERS.test(request.url())) {
      requests.push(request.url());
    }
  });

  await page.goto('/');
  await page.getByRole('contentinfo').waitFor();
  await page.goto('/ru/support/');

  await expect(page.getByRole('heading', { name: 'Cookies и аналитика' })).toHaveCount(0);
  await expect(page.getByRole('contentinfo').getByRole('button', { name: 'Настройки cookies' })).toHaveCount(0);
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_ga|_ym/);
  expect(requests).toEqual([]);
});
