// DYNAMICALLY POPULATED BOOK SECTION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let books = [];
const booksWrapper = document.getElementById('book-collection-wrapper');

function populateSection() {
  let books = [];
  books = retrieveFromStorage();
  for (let i = 0; i < books.length; i += 1) {
    const bookElement = books[i];

    const bookHTML = `
        <p>${bookElement.title}</p>
        <p>${bookElement.author}</p>
        <button>Remove</button>
        <hr />
`;
    const book = document.createElement('div');
    book.innerHTML = bookHTML;
    booksWrapper.appendChild(book);
    books = [];
  }
}
// LOCAL STORAGE LOGIC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let dataStored = [];

function retrieveFromStorage() {
  dataStored = localStorage.getItem('books');
  return JSON.parse(dataStored);
}

function addToStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
  let newBook = makeBook();
  books.push(newBook);
  addToStorage();
  populateSection();
}
const addButton = document.querySelector('#add_button');
addButton.addEventListener('click', addBook);

function makeBook() {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;

  const book = {
    title: title,
    author: author,
  };
  return book;
}
