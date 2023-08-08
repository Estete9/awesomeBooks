// VARIABLE AND ELEMENTS SETUP
const books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');
const addButton = document.getElementById('add_button');

// REMOVE BOOK FROM STORAGE AND UPDATE UI
function deleteBook(event) {
  const bookId = event.target.id;
  const local = JSON.parse(localStorage.getItem('books'));

  if (local === null) {
    books.length = 0;
  } else {
    books.splice(0, books.length, ...local);
  }
  localStorage.setItem('books', JSON.stringify(books));
  populateBookSection();
}

// SAVE INTERACTION WITH USER IN LOCAL STORAGE
function addToStorage() {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const book = {
    title,
    author,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  populateBookSection();
}

// REPOPULATE THE BOOK SECTION LOGIC
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
      <p>${bookElement.title}</p>
      <p>${bookElement.author}</p>
      <button class="delete-btn" id="${i}">Remove</button>
      <hr />
    `;

    book.innerHTML = bookHTML;
    booksWrapper.appendChild(book);
    const deleteBtn = book.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (event) => deleteBook(event));
  }
}

// Load initial book data after functions are defined
window.onload = () => {
  populateBookSection();
  addButton.addEventListener('click', addToStorage);
};
