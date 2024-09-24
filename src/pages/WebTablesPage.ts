import { Page } from '@playwright/test';
import { WebTablesSelectors } from '../selectors/WebTablesSelectors';

export class WebTablesPage {
    constructor(private page: Page) {}

    async navigateToWebTables() {
        await this.page.goto('https://demoqa.com/webtables');
    }

    async addNewRecord(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
        await this.page.click(WebTablesSelectors.addButton);
        await this.page.fill(WebTablesSelectors.firstNameInput, firstName);
        await this.page.fill(WebTablesSelectors.lastNameInput, lastName);
        await this.page.fill(WebTablesSelectors.emailInput, email);
        await this.page.fill(WebTablesSelectors.ageInput, age);
        await this.page.fill(WebTablesSelectors.salaryInput, salary);
        await this.page.fill(WebTablesSelectors.departmentInput, department);
        await this.page.click(WebTablesSelectors.submitButton);
        await this.waitForTableToUpdate();
    }

    async editFirstRecord(firstName: string, lastName: string, newAge: string, newSalary: string) {
        const firstRowEditButton = await this.page.locator(WebTablesSelectors.editButton(firstName, lastName));
        await firstRowEditButton.click();
        await this.page.fill(WebTablesSelectors.ageInput, newAge);
        await this.page.fill(WebTablesSelectors.salaryInput, newSalary);
        await this.page.click(WebTablesSelectors.submitButton);
        await this.waitForTableToUpdate();
    }

    async deleteFirstRecord(firstName: string, lastName: string) {
        const deleteButton = await this.page.locator(WebTablesSelectors.deleteButton(firstName, lastName));
        await deleteButton.click();
        await this.waitForTableToUpdate();
    }

    async validateNewRecord(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
        const record = await this.page.locator(`.rt-tbody .rt-tr-group:has-text("${firstName} ${lastName}")`);
        const recordText = await record.textContent();
        if (!recordText) {
            return false;
        }
        return recordText.includes(email) && recordText.includes(age) && recordText.includes(salary) && recordText.includes(department);
    }

    async validateRecordDeleted(firstName: string, lastName: string) {
        const recordCount = await this.page.locator(`.rt-tbody .rt-tr-group:has-text("${firstName} ${lastName}")`).count();
        return recordCount === 0;
    }

    private async waitForTableToUpdate() {
        // Esperar hasta que la tabla se actualice después de una operación (agregar, editar o eliminar)
        await this.page.waitForSelector('.rt-tbody .rt-tr-group', { state: 'attached' });
    }
}
