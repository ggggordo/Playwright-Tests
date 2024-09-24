import { Page } from '@playwright/test';
import { bookStoreSelectors } from '../selectors/bookstoreSelectors'; // Ajusta la ruta si es necesario

export class BookStorePage {
  constructor(private page: Page) {}

  async navigateToBookStore() {
    await this.page.click(bookStoreSelectors.bookStoreMenu);
  }

  async searchBook(bookName: string) {
    await this.page.fill(bookStoreSelectors.searchInput, bookName);
    await this.page.press(bookStoreSelectors.searchInput, 'Enter');
  }

  async validateBookInResults(bookName: string) {
    const bookLocator = this.page.locator(`${bookStoreSelectors.bookTitle}:has-text("${bookName}")`);
    await bookLocator.waitFor({ state: 'visible' });
    return bookLocator.isVisible();
  }

  async addBookToFavorites(bookName: string) {
    const bookLocator = this.page.locator(`${bookStoreSelectors.bookTitle}:has-text("${bookName}")`);
    const addToFavoritesButton = bookLocator.locator(bookStoreSelectors.addToFavoritesButton);
    await addToFavoritesButton.click();
  }

  async navigateToProfile() {
    await this.page.click('a[href="/profile"]');
  }

  async validateBookInProfile(bookName: string) {
    const favoriteBooksSection = this.page.locator(bookStoreSelectors.favoriteBooksSection);
    await favoriteBooksSection.waitFor({ state: 'visible' });
    const favoriteBookLocator = this.page.locator(`${bookStoreSelectors.favoriteBook}:has-text("${bookName}")`);
    return favoriteBookLocator.isVisible();
  }
}
