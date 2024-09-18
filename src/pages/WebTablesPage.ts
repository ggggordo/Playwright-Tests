import { Page } from '@playwright/test';
import { webTablesSelectors } from'../selectors/webTablesSelectors'; // Actualiza la ruta si es necesario

export class WebTablesPage {
  constructor(private page: Page) {}

  async navigateToWebTables() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  async addNewRecord(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await this.page.click(webTablesSelectors.addButton);
    await this.page.fill(webTablesSelectors.firstNameInput, firstName);
    await this.page.fill(webTablesSelectors.lastNameInput, lastName);
    await this.page.fill(webTablesSelectors.emailInput, email);
    await this.page.fill(webTablesSelectors.ageInput, age);
    await this.page.fill(webTablesSelectors.salaryInput, salary);
    await this.page.fill(webTablesSelectors.departmentInput, department);
    await this.page.click(webTablesSelectors.submitButton);
    await this.page.waitForSelector(webTablesSelectors.submitButton, { state: 'detached' });
  }

  async validateNewRecord(firstName: string, lastName: string, email: string) {
    const fullName = `${firstName} ${lastName}`;
    await this.page.waitForTimeout(1000);
    const recordExists = await this.page.locator(`${webTablesSelectors.tableRow}:has-text("${fullName}")`).count() > 0;
    const emailExists = await this.page.locator(`${webTablesSelectors.tableRow}:has-text("${email}")`).count() > 0;
    return recordExists && emailExists;
  }

  async editFirstRecord(newAge: string, newSalary: string) {
    await this.page.click(webTablesSelectors.editButton);
    await this.page.fill(webTablesSelectors.ageInput, newAge);
    await this.page.fill(webTablesSelectors.salaryInput, newSalary);
    await this.page.click(webTablesSelectors.submitButton);
    await this.page.waitForSelector(webTablesSelectors.submitButton, { state: 'detached' });
  }

  async deleteFirstRecord() {
    await this.page.click(webTablesSelectors.deleteButton);
  }

  async isRecordDeleted(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;
    try {
      await this.page.waitForSelector(`${webTablesSelectors.tableRow}:has-text("${fullName}")`, { state: 'detached' });
      return true;
    } catch {
      return false;
    }
  }
}
