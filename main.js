const addButton = document.getElementById('add_button');
const booksWrapper = document.getElementById('book-collection-wrapper');
const books = [];
let populateBookSection = () => {};
class Books {
  constructor() {
    this.title = '';
    this.author = '';
  }

  deleteBook(event) {
    const local = JSON.parse(localStorage.getItem('books'));
    const bookId = event.target.id;
    if (local === null) {
      books.length = 0;
    } else {
      books.splice(bookId, 1);
    }
    // eslint-disable-next-line
    localStorage.setItem('books', JSON.stringify(books)); // eslint-disable-line no-use-before-define
    populateBookSection();
  }

  // SAVE INTERACTION WITH USER IN LOCAL STORAGE
  addToStorage() {
    const book = {};
    book.title = document.querySelector('#book_title').value;
    book.author = document.querySelector('#book_author').value;
    books.push(book);
    // eslint-disable-next-line
    localStorage.setItem('books', JSON.stringify(books)); // eslint-disable-line no-use-before-define
    populateBookSection();
  }

  attachEventListener() {
    addButton.addEventListener('click', this.addToStorage);
    const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'));
    deleteBtns.forEach((it) => it.addEventListener('click', this.deleteBook));
  }
}

const bookItem = new Books();

populateBookSection = function () {
  const localData = localStorage.getItem('books');
  let local = [];

  try {
    local = JSON.parse(localData);
  } catch (error) {
    console.warn('local storage is empty');
    local = [];
  }
  books.splice(0, books.length, ...local);

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
    deleteBtn.addEventListener('click', (event) => bookItem.deleteBook(event));
  }
  bookItem.attachEventListener();
};

addButton.addEventListener('click', bookItem.addToStorage);
populateBookSection();
bookItem.attachEventListener();
