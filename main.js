const book1 = {
  id: 0,
  title: 'Mind and body',
  author: 'Alan Watts',
};

const book2 = {
  id: 1,
  title: 'Rich and Richness',
  author: 'Rich marcus',
};

let books = [book1, book2];
const booksWrapper = document.getElementById(
  'book-collection-wrapper'
);

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
}

let dataStored = [];

function addBook() {

  if (localStorage.getItem('books')) {
    dataStored = localStorage.getItem('books');
    books = JSON.parse(dataStored);
  }
  let book = makeBook();

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}
const addbutton = document.querySelector('#add_button');
addbutton.addEventListener('click', () => addBook());

function makeBook () {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  
  const book = {
    title: title,
    author: author,
  }
  return book;
}
