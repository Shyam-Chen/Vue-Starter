import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import lighthouse from 'lighthouse';

test('Sign-in', async () => {
  const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:8080/sign-in');
  await page.waitForLoadState('networkidle');

  const { lhr } = await lighthouse('http://localhost:8080/sign-in');
  const performance = lhr.categories.performance.score * 100;

  expect(performance).toBe(100);

  await browser.close();
});
