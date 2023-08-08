// VARIABLE AND ELEMENTS SETUP
let books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');
const addButton = document.getElementById('add_button');

// REPOPULATE THE BOOK SECTION LOGIC
function populateBookSection() {
  // retrieves from local storage to check if its empty or not, and what to do with the books array
  const local = JSON.parse(localStorage.getItem('books'));
  if (local === null) {
    books = [];
  } else {
    books = local;
  }

  // resets the wrapper so we can create and updates UI
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
    deleteBtn.addEventListener('click', (event) => {
      const bookId = event.target.id;
      const filteredBooks = books.filter((_, index) => index !== bookId);
      const local = JSON.parse(localStorage.getItem('books'));

      if (local === null) {
        books = [];
      } else {
        books = local;
      }
      books = filteredBooks;
      localStorage.setItem('books', JSON.stringify(books));
      populateBookSection();
    });
  }
}

// SAVE INTERACTION WITH USER IN LOCAL STORAGE
function addToStorage() {
  // retrieves the user's content from the inputs and creates an object
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const book = {};
  book.title = title;
  book.author = author;
  // adds the created object to local storage and restarts the section
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  populateBookSection();
}

addButton.addEventListener('click', addToStorage);

// REMOVE BOOK FROM STORAGE AND UPDATE UI
// get a reference to all the delete buttons

window.onload = populateBookSection;
