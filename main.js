const addButton = document.getElementById('add_button');
const booksWrapper = document.getElementById('book-collection-wrapper');
let populateBookSection = () => {};
const navBtns = document.querySelectorAll('#menu li');

// NAVIGATION MENU LOGIC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// onclick receives the index of which btn was clicked
function HighlightSelection(index) {
  navBtns.forEach((btn, i) => {
    btn.classList.remove('selected');
    if (index === i) {
      // checks which button was clicked and adds a class
      btn.classList.add('selected');
    }
  });
}

function navigate(index) {
  const sections = ['list', 'add-new', 'contact'];
  const bookCollection = document.getElementById('book-collection');
  const addBookSection = document.getElementById('add-book-section');
  const contactSection = document.getElementById('contact-section');
  switch (sections[index]) {
    // compares and changes the elements class accordingly to show or hide the sections
    case 'list': {
      bookCollection.classList.add('show');
      addBookSection.classList.remove('show');
      contactSection.classList.remove('show');
      HighlightSelection(index);
      break;
    }
    case 'add-new': {
      bookCollection.classList.remove('show');
      addBookSection.classList.add('show');
      contactSection.classList.remove('show');
      HighlightSelection(index);
      break;
    }
    case 'contact': {
      bookCollection.classList.remove('show');
      addBookSection.classList.remove('show');
      contactSection.classList.add('show');
      HighlightSelection(index);
      break;
    }
    default: {
      break;
    }
  }
}

// loop through btns adding onclick
navBtns.forEach((btn, index) => {
  btn.onclick = () => navigate(index);
});
// BOOK COLLECTION CLASS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
    addButton.onclick = this.addToStorage;
    const deleteBtns = Array.from(document.querySelectorAll('.delete-btn'));
    deleteBtns.forEach((it) => {
      it.onclick = this.deleteBook;
    });
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

bookItem.attachEventListener();
populateBookSection();
