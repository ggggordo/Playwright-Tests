import { Page } from '@playwright/test';

export class FormsPage {
  readonly page: Page;
  readonly firstNameInput = '#firstName';
  readonly lastNameInput = '#lastName';
  readonly emailInput = '#userEmail';
  readonly genderRadioButton = '#genterWrapper > div.col-md-9.col-sm-12 > div:nth-child(1) > label'; // Ejemplo: Masculino
  readonly mobileInput = '#userNumber';
  readonly datePicker = '#dateOfBirthInput';
  readonly hobbiesCheckbox = '#hobbiesWrapper > div.col-md-9.col-sm-12 > div:nth-child(1) > label'; // Ejemplo: Sports
  readonly uploadPictureInput = '#uploadPicture';
  readonly submitButton = '#submit';
  readonly confirmationMessage = '.modal-title'; // Modal de confirmación de envío exitoso

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToFormsPage() {
    await this.page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'networkidle' });
  }

  async fillForm({
    firstName,
    lastName,
    email,
    mobile,
    picturePath
  }: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    picturePath: string;
  }) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.genderRadioButton);
    await this.page.fill(this.mobileInput, mobile);

    // Seleccionar una fecha de nacimiento
    await this.page.click(this.datePicker);
    await this.page.keyboard.press('ArrowLeft'); // Ajustar fecha
    await this.page.keyboard.press('Enter'); // Confirmar la fecha

    // Marcar la casilla de intereses
    await this.page.check(this.hobbiesCheckbox);

    // Subir una imagen
    await this.page.setInputFiles(this.uploadPictureInput, picturePath);

    // Hacer clic en el botón Submit
    await this.page.click(this.submitButton);
  }

  async isConfirmationVisible(): Promise<boolean> {
    return await this.page.isVisible(this.confirmationMessage);
  }
}
