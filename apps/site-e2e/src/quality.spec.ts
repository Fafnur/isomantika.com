import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = ['', 'privacy/', 'terms/', 'consent/', 'support/', 'delete-account/', 'contact/', 'missing-page/'];
const LOCALES = ['', 'ru/', 'es/'];
const URLS = LOCALES.flatMap((locale) => PAGES.map((page) => `/${locale}${page}`));

test.describe('accessibility', () => {
  for (const url of URLS) {
    test(`${url} has no serious or critical axe violations`, async ({ page }) => {
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

test('every internal link of the built site leads to an existing page', async ({ page, request }) => {
  const links = new Map<string, string>();
  for (const url of URLS.filter((candidate) => !candidate.includes('missing-page'))) {
    await page.goto(url);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href') ?? ''))) {
      links.set(href.split('#')[0].split('?')[0], url);
    }
  }

  const statuses = await Promise.all([...links].map(async ([href, from]) => ({ href, from, status: (await request.get(href)).status() })));
  const broken = statuses.filter(({ status }) => status !== 200).map(({ href, from, status }) => `${href} (${status}) on ${from}`);

  expect(links.size).toBeGreaterThan(20);
  expect(broken).toEqual([]);
});

test('sitemap and robots.txt are served', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/^Sitemap: https:\/\/[^/]+\/sitemap\.xml$/m);

  const sitemap = await (await request.get('/sitemap.xml')).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);

  expect(locs).toHaveLength(21);
  expect(locs).toContain('/ru/privacy/');
  expect(locs.some((loc) => loc.includes('404'))).toBe(false);
  for (const loc of locs) {
    expect((await request.get(loc)).status(), loc).toBe(200);
  }
});
