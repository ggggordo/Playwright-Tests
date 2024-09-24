import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
});

test('should show an error when login with invalid credentials', async () => {
  await loginPage.login('invalid_user', 'invalid_password');
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBe(true);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('Invalid username or password!');
});
