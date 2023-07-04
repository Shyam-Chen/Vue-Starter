import type { Browser, Page } from 'playwright';
import { beforeAll, afterAll, test, expect } from 'vitest';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

test('entry point', async () => {
  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');

  const runnerResult = await lighthouse('http://localhost:8080');

  const performanceScore = Number(runnerResult?.lhr.categories.performance.score) * 100;
  expect(performanceScore).toBe(100);
});
