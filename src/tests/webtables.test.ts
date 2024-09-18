import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/WebTablesPage';

test.describe('Pruebas automatizadas en Web Tables', () => {
  let webTablesPage: WebTablesPage;
  const firstName = 'Juan';
  const lastName = 'Perez';
  const email = 'juan.perez@example.com';
  const age = '30';
  const salary = '50000';
  const department = 'IT';
  const newAge = '35';
  const newSalary = '60000';

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigateToWebTables();
  });

  test('Agregar, editar y eliminar un registro en la tabla', async ({ page }) => {
    // Agregar nuevo registro
    await webTablesPage.addNewRecord(firstName, lastName, email, age, salary, department);
    
    // Validar que el registro fue agregado
    const isRecordAdded = await webTablesPage.validateNewRecord(firstName, lastName, email);
    expect(isRecordAdded).toBe(true);

    // Editar el registro
    await webTablesPage.editFirstRecord(newAge, newSalary);
    
    // Validar que el registro fue editado correctamente
    const isEdited = await webTablesPage.validateNewRecord(firstName, lastName, email);
    expect(isEdited).toBe(true);

    // Eliminar el registro
    await webTablesPage.deleteFirstRecord();
    
    // Validar que el registro fue eliminado
    const isDeleted = await webTablesPage.isRecordDeleted(firstName, lastName);
    expect(isDeleted).toBe(true);
  });
});
