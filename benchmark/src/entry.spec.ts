import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';

test('Entry', async () => {
  const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');

  const runnerResult = await lighthouse('http://localhost:8080');

  const performance = Number(runnerResult?.lhr.categories.performance.score) * 100;
  expect(performance).toBe(90);

  await browser.close();
});
