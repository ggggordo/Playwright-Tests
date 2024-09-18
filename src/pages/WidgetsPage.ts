import { Page } from '@playwright/test';
import { widgetsSelectors } from '../selectors/widgetsSelectors';

export class WidgetsPage {
  readonly page: Page;
  readonly selectors = widgetsSelectors;

  constructor(page: Page) {
    this.page = page;
  }

  // Navegar a Date Picker
  async goToDatePicker() {
    await this.page.goto('https://demoqa.com/date-picker');
  }

  // Seleccionar una fecha en el Date Picker
  async selectDate(date: string) {
    await this.page.fill(this.selectors.datePickerInput, date);
  }

  // Navegar a Progress Bar
  async goToProgressBar() {
    await this.page.goto('https://demoqa.com/progress-bar');
  }

  // Iniciar la Progress Bar y esperar a que llegue al 100%
  async startProgressBarAndWait() {
    await this.page.click(this.selectors.progressBarStartButton);
    await this.page.waitForSelector(this.selectors.progressBarComplete, { timeout: 15000 });
  }

  // Navegar a Slider
  async goToSlider() {
    await this.page.goto('https://demoqa.com/slider');
  }

  // Mover el Slider a una posición determinada
  async moveSliderTo(position: number) {
    const sliderHandle = this.page.locator(this.selectors.sliderHandle);
    const sliderValueSelector = 'input#sliderValue'; // O el selector del valor visible
    
    const boundingBox = await sliderHandle.boundingBox();
    if (boundingBox) {
      const startX = boundingBox.x + boundingBox.width / 2;
      const moveX = startX + ((position / 100) * boundingBox.width) - startX;
      
      // Mueve el mouse sobre el slider
      await this.page.mouse.move(startX, boundingBox.y + boundingBox.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(moveX, boundingBox.y + boundingBox.height / 2);
      await this.page.mouse.up();
  
      // Verifica el valor después de mover el slider
      const sliderValue = await this.page.inputValue(sliderValueSelector);
      return Number(sliderValue);  // Devuelve el valor actual del slider
    }
    throw new Error('Unable to move the slider');
  }  

  // Navegar a Tool Tips
  async goToToolTips() {
    await this.page.goto('https://demoqa.com/tool-tips');
  }

  // Hover sobre el botón para mostrar el tooltip
  async hoverOverTooltipButton() {
    await this.page.hover(this.selectors.toolTipButton);
  }
}
