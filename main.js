const addButton = document.getElementById('add_button');
const booksWrapper = document.getElementById('book-collection-wrapper');
let books = [];
let populateBookSection = () => {};
class Books {
  constructor() {
    this.title = '';
    this.author = '';
    this.booksArr = books;
  }

  deleteBook(event) {
    const local = JSON.parse(localStorage.getItem('books'));
    const bookId = event.target.id;
    if (local === null) {
      this.booksArr.length = 0;
    } else {
      this.booksArr.splice(bookId, 1);
      books = this.booksArr;
    }
    // eslint-disable-next-line
    localStorage.setItem('books', JSON.stringify(books));
    populateBookSection();
  }

  // SAVE INTERACTION WITH USER IN LOCAL STORAGE
  // eslint-disable-next-line class-methods-use-this
  addToStorage() {
    const book = {};
    book.title = document.querySelector('#book_title').value;
    book.author = document.querySelector('#book_author').value;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
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
