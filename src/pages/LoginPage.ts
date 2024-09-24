import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly errorMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage = '#name'; // Usar un selector CSS válido
  }

  async navigateToLoginPage() {
    await this.page.goto('https://demoqa.com/login', { timeout: 60000, waitUntil: 'networkidle' });
  }

  async login(username: string, password: string) {
    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);
    await this.page.click('#login');
  }

  async isErrorMessageVisible(): Promise<boolean> {
    await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
    return this.page.isVisible(this.errorMessage);
  }

  async getErrorMessage(): Promise<string | null> {
    await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
    return this.page.textContent(this.errorMessage);
  }
}
