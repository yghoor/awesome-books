const pageBody = document.body;

// Create main page elements

const mainPage = document.createElement('section');
mainPage.id = 'main-page';
mainPage.className = 'container d-flex flex-column justify-content-center align-items-center';
mainPage.innerHTML = `
  <header class="p-3 mb-1">
    <h1>All awesome books</h1>
  </header>

  <section id="book-list" class="container-fluid p-0 d-flex-flex-column rounded-2"></section>

  <hr class="opacity-100 m-4">
    
  <section id="form-section" class="d-flex flex-column justify-content-center align-items-center">
    <h2 class="mb-3">Add a new book</h2>

    <form method="post" id="add-book" class="d-flex flex-column gap-3">
      <label>
        <input type="text" id="title" maxlength="60" placeholder="Title" class="border-4 border-dark rounded-1 fw-bold px-1" required />
      </label>
    
      <label>
        <input type="text" id="author" maxlength="30" placeholder="Author" class="border-4 border-dark rounded-1 fw-bold px-1" required />
      </label>
    
      <button type="submit" class="align-self-end bg-white px-3">Add</button>
    </form>
  </section>`;

pageBody.appendChild(mainPage);

// Add books collection functionality

const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('add-book');

class BookArray {
  constructor() {
    this.books = [];
  }

  createBook(title, author) {
    const book = {
      title,
      author,
    };
    this.books.push(book);
  }

  removeBookFromArray(bookNum) {
    this.books.splice(bookNum, 1);
  }
}

const booksObj = new BookArray();
// eslint-disable-next-line prefer-destructuring
let books = booksObj.books;

function addBookToPage(title, author, bookNum) {
  const bookDiv = document.createElement('div');
  const bookId = bookNum;
  bookDiv.classList.add(`book-${bookId}`);

  bookDiv.innerHTML = `
    <h2></h2>
    <h3></h3>
    <button type="button" onmousedown="removeBook(${bookId})">Remove</button>`;

  bookDiv.children[0].textContent = `${title}`;
  bookDiv.children[1].textContent = `${author}`;

  bookList.appendChild(bookDiv);
}

function displayStoredBooks() {
  books.forEach((book, bookNum) => {
    booksObj.createBook(book.title, book.author);
    addBookToPage(book.title, book.author, bookNum);
  });
}

function displayCurrentBooks() {
  books.forEach((book, bookNum) => {
    addBookToPage(book.title, book.author, bookNum);
  });
}

function saveBooksToLocalStorage() {
  books = booksObj.books;
  localStorage.setItem('books', JSON.stringify(books));
}

// eslint-disable-next-line no-unused-vars
function removeBook(bookId) {
  booksObj.removeBookFromArray(bookId);
  saveBooksToLocalStorage();

  bookList.innerHTML = '';
  displayCurrentBooks();
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const currentTitle = bookForm.elements.title.value;
  const currentAuthor = bookForm.elements.author.value;

  bookForm.reset();

  booksObj.createBook(currentTitle, currentAuthor);
  saveBooksToLocalStorage();
  addBookToPage(currentTitle, currentAuthor, books.length);
  window.location.reload();
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  displayStoredBooks();
}
