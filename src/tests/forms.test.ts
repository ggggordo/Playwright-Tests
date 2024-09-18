import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage';

test.describe('Forms Tests', () => {
  let formsPage: FormsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.navigateToFormsPage(); // Navegar a la página del formulario
  });

  test('should fill and submit the form successfully', async ({ page }) => {
    await formsPage.fillForm({
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@example.com',
      mobile: '1234567890',
      picturePath: 'C:/Users/lucas/Downloads/ysy-disco.jpg' // Ruta de la imagen en tu máquina
    });

    expect(await formsPage.isConfirmationVisible()).toBe(true); // Validar que el formulario se envió correctamente
  });
});

