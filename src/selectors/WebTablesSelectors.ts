export const WebTablesSelectors = {
  addButton: '#addNewRecordButton',
  firstNameInput: '#firstName',
  lastNameInput: '#lastName',
  emailInput: '#userEmail',
  ageInput: '#age',
  salaryInput: '#salary',
  departmentInput: '#department',
  submitButton: '#submit',
  editButton: (firstName: string, lastName: string) => `.rt-tbody .rt-tr-group:has-text("${firstName} ${lastName}") .action-buttons span[title="Edit"]`,
  deleteButton: (firstName: string, lastName: string) => `.rt-tbody .rt-tr-group:has-text("${firstName} ${lastName}") .action-buttons span[title="Delete"]`,
};
