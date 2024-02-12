import { test, expect } from '@playwright/test';
import signIn from 'mock/auth/sign-in/response';

test('Sign-in', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' });

  expect(page.getByText('Sign in to our platform')).toBeVisible();

  await page.route('**/api/auth/sign-in', (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(signIn['successful']),
    }),
  );

  await page.getByTestId('sign-in').click();

  await expect(page).toHaveURL(/.*dashboard/);
});
