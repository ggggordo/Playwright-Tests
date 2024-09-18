import { test, expect } from '@playwright/test';
import { WidgetsPage } from '../pages/WidgetsPage';

test.describe('Interactuar con widgets', () => {
  let widgetsPage: WidgetsPage;

  test.beforeEach(async ({ page }) => {
    widgetsPage = new WidgetsPage(page);
  });

  test.only('Debería interactuar con Date Picker, Progress Bar, Slider y Tool Tips y validar las acciones', async ({ page }) => {

    await widgetsPage.goToDatePicker(); // Navegar a la sección Date Picker y seleccionar una fecha
    const selectedDate = '12/12/2024';  // Cambia la fecha según lo necesites
    await widgetsPage.selectDate(selectedDate);
    const datePickerValue = await page.inputValue(widgetsPage.selectors.datePickerInput);
    expect(datePickerValue).toBe(selectedDate);  // Validar que la fecha seleccionada sea correcta

    await widgetsPage.goToProgressBar(); // Navegar a la sección Progress Bar y esperar a que llegue al 100%
    await widgetsPage.startProgressBarAndWait();
    const progressBarValue = await page.textContent(widgetsPage.selectors.progressBarComplete);
    expect(progressBarValue).toBe('100%');  // Validar que la barra de progreso llegue al 100%

    await widgetsPage.goToSlider(); // Navegar a la sección Slider y mover el slider a una posición determinada
    const sliderPosition = 75;
    await widgetsPage.moveSliderTo(sliderPosition);
    await page.waitForTimeout(4000)
    const sliderValue = await widgetsPage.moveSliderTo(sliderPosition); // Obtener el valor del slider
    expect(sliderValue).toBe(sliderPosition); // ERROR

    await widgetsPage.goToToolTips(); // Navegar a la sección Tool Tips y validar el contenido del tooltip
    const expectedTooltipText = 'You hovered over the Button';
    await widgetsPage.hoverOverTooltipButton();
    const actualTooltipText = await page.textContent(widgetsPage.selectors.toolTipText);
    expect(actualTooltipText).toBe(expectedTooltipText);  // Validar que el tooltip muestre el texto correcto
  });
});
