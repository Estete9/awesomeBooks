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

const bookCollection = [book1, book2];
const bookCollectionWrapper = document.getElementById(
  'book-collection-wrapper'
);

for (let i = 0; i < bookCollection.length; i += 1) {
  const bookElement = bookCollection[i];

  const bookHTML = `
        <p>${bookElement.title}</p>
        <p>${bookElement.author}</p>
        <button>Remove</button>
        <hr />
`;
  const book = document.createElement('div');
  book.innerHTML = bookHTML;
  bookCollectionWrapper.appendChild(book);
}
