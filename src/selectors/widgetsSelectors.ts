export const widgetsSelectors = {
  // Selector para el slider track
  sliderTrack: 'input[type="range"]', // Actualiza el selector según la estructura de la página
  // Selector para el slider handle
  sliderHandle: 'input[type="range"]', // Actualiza el selector según la estructura de la página
  // Selector para el valor del slider mostrado
  sliderValue: 'input[type="range"]', // Actualiza el selector según la estructura de la página
  
  // Selectores para las secciones de Date Picker, Progress Bar, Tool Tips
  datePickerInput: 'input#datePickerMonthYearInput', // Ejemplo, actualiza según la estructura
  progressBar: 'div#progressBar', // Ejemplo, actualiza según la estructura
  toolTipsButton: 'button#toolTipButton', // Selector del botón que activa el tooltip
  toolTipsText: 'div.tooltip-inner', // Actualiza el selector según la estructura del tooltip
};

export default widgetsSelectors;
