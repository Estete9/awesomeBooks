let books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');

function populateBookSection() {
  let local = JSON.parse(localStorage.getItem('books'));

  if (local === null) {
    books = [];
  } else {
    books = local;
  }

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

function addToStorage() {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const book = {
    title: title,
    author: author,
  };

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  populateBookSection();
}

const addButton = document.getElementById('add_button');
addButton.addEventListener('click', addToStorage);

window.onload = populateBookSection;

// on page load
// retrieve from local storage and update information before populating
// call a function to populate the section with local storage data
// add book to local storage
// reset the current array of books
// update the array of books from local storage
// repopulate section
//
