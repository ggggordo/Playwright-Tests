import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#userName';   // Selector de Username
  readonly passwordInput = '#password';   // Selector de Password
  readonly loginButton = '#login';        // Selector del botón Login
  readonly errorMessage = '<p id="name" class="mb-1" style="color: red;">Invalid username or password!</p>"]'; // Selector del mensaje de error

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('https://demoqa.com/login'); 
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  // Método para verificar si el mensaje de error es visible
  async isErrorMessageVisible(): Promise<boolean> {
    await this.page.waitForSelector(this.errorMessage, { timeout: 5000 }); // Espera hasta 5 segundos
    return this.page.isVisible(this.errorMessage);
  }
}
