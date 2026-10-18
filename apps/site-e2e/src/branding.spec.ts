import { expect, test } from './fixtures';

test('icons and the manifest from <head> are served', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page
    .locator('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')
    .evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));
  expect(hrefs).toHaveLength(4);

  for (const href of hrefs) {
    expect((await request.get(href)).status(), href).toBe(200);
  }

  const manifest = await (await request.get('/site.webmanifest')).json();
  for (const icon of manifest.icons) {
    expect((await request.get(icon.src)).status(), icon.src).toBe(200);
  }

  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#17182B');
});

const locales = [
  { url: '/', file: 'manrope-latin-wght-normal.woff2' },
  { url: '/ru/', file: 'manrope-cyrillic-wght-normal.woff2' },
];

for (const { url, file } of locales) {
  test(`${url} uses the site fonts and colours`, async ({ page }) => {
    const font = page.waitForResponse((response) => response.url().endsWith(`/fonts/${file}`));
    await page.goto(url);

    expect((await font).status()).toBe(200);

    const body = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return { family: style.fontFamily, weight: style.fontWeight, background: getComputedStyle(document.documentElement).backgroundColor };
    });
    expect(body.family).toContain('Manrope');
    expect(body.weight).toBe('500');
    expect(body.background).toBe('rgb(23, 24, 43)');
    expect(await page.locator('h1').evaluate((h1) => getComputedStyle(h1).fontFamily)).toContain('Cormorant Garamond');
  });
}

test('prerendered pages are hydrated, not rendered again', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));

  await page.goto('/ru/privacy/');
  const state = await page.locator('script#ng-state').textContent();

  expect(JSON.parse(state ?? '{}').__nghData__?.length).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});
