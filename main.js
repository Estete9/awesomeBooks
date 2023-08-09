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
    const book = {};
    book.title = document.querySelector('#book_title').value;
    book.author = document.querySelector('#book_author').value;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    populateBookSection();
  }

  attachEventListener() {
    console.log('attach listeners');
    addButton.addEventListener('click', this.addToStorage);
    const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'));
    deleteBtns.forEach((it) => it.addEventListener('click', this.deleteBook));
  }
}

const bookItem = new Books();

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
  }
  bookItem.attachEventListener();
}

populateBookSection();
bookItem.attachEventListener();
