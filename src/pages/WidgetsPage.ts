import { Page } from '@playwright/test';
import widgetsSelectors from '../selectors/widgetsSelectors'; // Actualiza la ruta si es necesario

export class WidgetsPage {
  constructor(private page: Page) {}

  async navigateToSlider() {
    await this.page.goto('https://demoqa.com/slider'); // Navega a la sección del slider
  }

  async moveSliderTo(value: number) {
    const sliderHandle = this.page.locator(widgetsSelectors.sliderHandle);

    // Esperar a que el slider sea visible y pueda ser interactuado
    await sliderHandle.waitFor({ state: 'visible' });

    // Establecer el valor del slider directamente
    await sliderHandle.evaluate((slider, value) => {
      (slider as HTMLInputElement).value = value.toString();
      slider.dispatchEvent(new Event('input'));
      slider.dispatchEvent(new Event('change'));
    }, value);

    // Obtener el valor del slider después de moverlo
    const sliderValue = await sliderHandle.evaluate(el => parseFloat((el as HTMLInputElement).value));

    return sliderValue;
  }

  async goToToolTips() {
    await this.page.goto('https://demoqa.com/tool-tips'); // Navegar a la sección Tool Tips
  }

  async hoverOverButton() {
    await this.page.locator(widgetsSelectors.toolTipsButton).hover();
  }

  async getToolTipText() {
    const toolTip = this.page.locator(widgetsSelectors.toolTipsText);
    await toolTip.waitFor({ state: 'visible', timeout: 5000 }); // Esperar a que el tooltip sea visible
    return toolTip.innerText();
  }

  // Agrega métodos para interactuar con Date Picker y Progress Bar si es necesario
}
