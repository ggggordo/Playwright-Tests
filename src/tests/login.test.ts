import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('should show an error when login with invalid credentials', async ({ page }) => {
    // Simula el login con credenciales incorrectas
    await loginPage.login('invalidUser', 'invalidPassword');
    await loginPage.isErrorMessageVisible();
    // Valida que aparezca el mensaje de error
   // const isErrorVisible = await loginPage.isErrorMessageVisible();
    //expect(isErrorVisible).toBe(true); // Verifica que el mensaje de error sea visible
  });
});
