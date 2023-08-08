// VARIABLE AND ELEMENT SETUP
let books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');
const addButton = document.getElementById('add_button');
addButton.addEventListener('click', addToStorage);

// REPOPULATES THE BOOK SECTION LOGIC
function populateBookSection() {
  // retrieves from local storage to check if its empty or not, and what to do with the books array
  let local = JSON.parse(localStorage.getItem('books'));
  if (local === null) {
    books = [];
  } else {
    books = local;
  }

  // resets the wrapper so we can create and repopulate with the updated information
  booksWrapper.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('div');
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

// SAVE INTERACTION WITH USER IN LOCAL STORAGE
function addToStorage() {
  // retrieves the user's content from the inputs and creates an object
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const book = {
    title: title,
    author: author,
  };
  // adds the created object to local storage and restarts the section
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  populateBookSection();
}

window.onload = populateBookSection;
