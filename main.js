const addButton = document.getElementById('add_button');
const booksWrapper = document.getElementById('book-collection-wrapper');
let populateBookSection = () => {};
class Books {
  constructor() {
    this.title = '';
    this.author = '';
    this.booksArr = [];
  }

  deleteBook(event) {
    const localData = localStorage.getItem('books');
    let local = [];
    const bookId = event.target.id;

    try {
      local = JSON.parse(localData);
    } catch (error) {
      console.warn('local storage is empty');
      local = [];
    }

    this.booksArr = local;
    this.booksArr.splice(bookId, 1);
    localStorage.setItem('books', JSON.stringify(this.booksArr));
    populateBookSection();
  }

  // SAVE INTERACTION WITH USER IN LOCAL STORAGE
  addToStorage() {
    const localData = localStorage.getItem('books');
    let local = [];

    try {
      local = JSON.parse(localData);
    } catch (error) {
      console.warn('local storage is empty');
      local = [];
    }

    this.booksArr = local;
    const book = {};
    book.title = document.querySelector('#book_title').value;
    book.author = document.querySelector('#book_author').value;
    this.booksArr.push(book);
    localStorage.setItem('books', JSON.stringify(this.booksArr));
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

  bookItem.booksArr = local;
  booksWrapper.innerHTML = '';
  for (let i = 0; i < bookItem.booksArr.length; i += 1) {
    const book = document.createElement('div');
    book.className = 'book-item';
    const bookElement = bookItem.booksArr[i];

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
};

addButton.addEventListener('click', bookItem.addToStorage);
populateBookSection();
bookItem.attachEventListener();
