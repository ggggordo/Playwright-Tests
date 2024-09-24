export const bookStoreSelectors = {
    bookStoreMenu: '#app > div > div > div.home-body > div > div:nth-child(6) > div',
    searchInput: 'input#searchBox',
    bookTitle: '#app > div > div > div > div.col-12.mt-4.col-md-6 > div.books-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-thead.-header > div > div.rt-th.rt-resizable-header.-sort-asc.-cursor-pointer > div.rt-resizable-header-content',
    addToFavoritesButton: 'button:text("Add To Your Collection")',
    profileMenu: 'a[href="/profile"]',
    favoriteBooksSection: 'div.bg-light:has-text("Your Favorite Books")',
    favoriteBook: '#see-book-Git\ Pocket\ Guide > a', // Puedes especificar el selector exacto aquí si hay uno único para el libro
    gitpocket: 'text="Git Pocket Guide"',
  };
  
  export default bookStoreSelectors;
  