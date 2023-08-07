let books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');
const book = document.createElement('div');

function populateBookSection() {
  for (let i = 0; i < books.length; i += 1) {
    const bookElement = books[i];

    const bookHTML = `
          <p>${bookElement.title}</p>
          <p>${bookElement.author}</p>
          <button>Remove</button>
          <hr />
  `;
    book.innerHTML = bookHTML;
    booksWrapper.appendChild(book);
  }
}
