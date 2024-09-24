import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/WebTablesPage';

let webTablesPage: WebTablesPage;

test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    console.log('Navegando a la sección de Web Tables');
    await webTablesPage.navigateToWebTables();
});

test.only('Agregar, editar y eliminar un registro en la tabla', async ({ page }) => {
    const firstName = 'Cierra';
    const lastName = 'Vega';
    const email = 'cierra@example.com';
    const age = '39';
    const salary = '10000';
    const department = 'Insurance';
    const newAge = '40';
    const newSalary = '12000';

    // Agregar un nuevo registro
    console.log(`Agregando un nuevo registro con nombre: ${firstName} ${lastName}`);
    await webTablesPage.addNewRecord(firstName, lastName, email, age, salary, department);

    // Validar que el registro fue agregado
    console.log('Esperando a que la tabla se actualice');
    await page.waitForTimeout(2000); // Esperar a que la tabla se actualice
    console.log('Validando que el registro fue agregado correctamente');
    const isRecordAdded = await webTablesPage.validateNewRecord(firstName, lastName, email, age, salary, department);
    expect(isRecordAdded).toBe(true);

    // Editar el registro
    console.log(`Editando el registro de ${firstName} ${lastName}`);
    await webTablesPage.editFirstRecord(firstName, lastName, newAge, newSalary);

    // Validar que el registro fue editado correctamente
    console.log('Validando que el registro fue editado correctamente');
    const isEdited = await webTablesPage.validateNewRecord(firstName, lastName, email, newAge, newSalary, department);
    expect(isEdited).toBe(true);

    // Eliminar el registro
    console.log(`Eliminando el registro de ${firstName} ${lastName}`);
    await webTablesPage.deleteFirstRecord(firstName, lastName);

    // Validar que el registro fue eliminado
    console.log('Validando que el registro fue eliminado correctamente');
    const isDeleted = await webTablesPage.validateRecordDeleted(firstName, lastName);
    expect(isDeleted).toBe(true);
});
