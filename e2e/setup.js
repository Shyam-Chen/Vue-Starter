import { chromium } from 'playwright';
import lighthouse from 'lighthouse';

jest.setTimeout(100 * 1000);

global.SITE_URL = 'http://localhost:8080/#';
global.API_URL = 'http://localhost:3000';

global.audit = async (url) => {
  const lhr = await lighthouse(url, {
    port: 9222,
  });

  return lhr;
};

global.result = async (lhr, property) => {
  const jsonProperty = new Map()
    .set('accessibility', (await lhr.lhr.categories.accessibility.score) * 100)
    .set('performance', (await lhr.lhr.categories.performance.score) * 100)
    .set('progressiveWebApp', (await lhr.lhr.categories.pwa.score) * 100)
    .set('bestPractices', (await lhr.lhr.categories['best-practices'].score) * 100)
    .set('seo', (await lhr.lhr.categories.seo.score) * 100)
    .set('pageSpeed', (await lhr.lhr.audits['speed-index'].score) * 100);

  const result = await jsonProperty.get(property);
  return result;
};

beforeAll(async () => {
  global.browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox', '--remote-debugging-port=9222'],
    slowMo: 0.5 * 1000,
  });
});

afterAll(async () => {
  await global.browser.close();
});
