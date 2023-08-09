const addButton = document.getElementById('add_button');
const booksWrapper = document.getElementById('book-collection-wrapper');
const books = [];
class Books {
  constructor() {
    this.title = '';
    this.author = '';
  }

  // deleteBook = function () {};

  deleteBook(event) {
    const local = JSON.parse(localStorage.getItem('books'));
    const bookId = event.target.id;
    if (local === null) {
      books.length = 0;
    } else {
      books.splice(bookId, 1);
    }
    localStorage.setItem('books', JSON.stringify(books));
    populateBookSection();
  }

  // SAVE INTERACTION WITH USER IN LOCAL STORAGE
  addToStorage() {
    // const title = document.querySelector('#book_title').value;
    // const author = document.querySelector('#book_author').value;
    const book = {};
    book.title = document.querySelector('#book_title').value;
    book.author = document.querySelector('#book_author').value;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    populateBookSection();
  }
}

function populateBookSection() {
  const local = JSON.parse(localStorage.getItem('books'));
  if (local === null) {
    books.length = 0;
  } else {
    books.splice(0, books.length, ...local);
  }

  booksWrapper.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('div');
    book.className = 'book-item';
    const bookElement = books[i];

    const bookHTML = `
        <p>"${bookElement.title}" by</p>
        <p>${bookElement.author}</p>
        <button class="delete-btn" id="${i}">Remove</button>
        <hr />
      `;

    book.innerHTML = bookHTML;
    booksWrapper.appendChild(book);
    const deleteBtn = book.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => this.deleteBook(event));
  }
}

const book = new Books();
addButton.addEventListener('click', book.addToStorage);
populateBookSection();
