import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/BookStorePage'; // Ajusta la ruta si es necesario

test.describe('Automatización de la funcionalidad de Book Store', () => {
  let bookStorePage: BookStorePage;
  const bookName = 'Git Pocket Guide'; // Reemplaza con el nombre del libro que deseas buscar

  test.beforeEach(async ({ page }) => {
    bookStorePage = new BookStorePage(page);
    console.log('Navegando a la página principal de Demo QA');
    await page.goto('https://demoqa.com/');
  });

  test('Debería buscar un libro, agregarlo a favoritos y validar en el perfil', async () => {
    // Navegar a la sección de Book Store
    console.log('Navegando a la sección de Book Store');
    await bookStorePage.navigateToBookStore();
    
    // Buscar un libro específico usando el campo de búsqueda
    console.log(`Buscando el libro: ${bookName}`);
    await bookStorePage.searchBook(bookName); //!!!
    
    // Validar que el libro aparece en los resultados
    console.log(`Validando que el libro "${bookName}" aparece en los resultados de búsqueda`);
    const isBookInResults = await bookStorePage.validateBookInResults(bookName);
    expect(isBookInResults).toBe(true);

    // Agregar el libro a la colección de favoritos
    console.log(`Agregando el libro "${bookName}" a la colección de favoritos`);
    await bookStorePage.addBookToFavorites(bookName);
    
    // Navegar a la sección de Profile
    console.log('Navegando a la sección de Profile');
    await bookStorePage.navigateToProfile();
    
    // Validar que el libro agregado está en la colección
    console.log(`Validando que el libro "${bookName}" está en la colección de favoritos en el perfil`);
    const isBookInProfile = await bookStorePage.validateBookInProfile(bookName);
    expect(isBookInProfile).toBe(true);
  });
});
