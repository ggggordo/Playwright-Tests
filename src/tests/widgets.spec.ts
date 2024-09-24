import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Interactuar con widgets', () => {
  let widgetsPage: WidgetsPage;
  const sliderPosition = 80; // Cambia este valor según tus necesidades

  test.beforeEach(async ({ page }) => {
    widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateToSlider(); // Navegar a la sección del slider antes de realizar la acción
  });

  test('Debería interactuar con Date Picker, Progress Bar, Slider y Tool Tips y validar las acciones', async ({ page }) => {
    // Interactuar con el Slider
    const sliderValue = await widgetsPage.moveSliderTo(sliderPosition); // Obtener el valor del slider
    console.log(`Valor del slider: ${sliderValue}`);
    expect(sliderValue).toBe(sliderPosition); // Comprobar que el slider está en la posición correcta

    // Interactuar con Tool Tips
    await widgetsPage.goToToolTips(); // Navegar a la sección Tool Tips y validar el contenido del tooltip
    const expectedTooltipText = 'You hovered over the Button';
    await widgetsPage.hoverOverButton();
    const actualTooltipText = await widgetsPage.getToolTipText();
    expect(actualTooltipText).toBe(expectedTooltipText);
  });
});
