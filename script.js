/* eslint-disable no-unused-vars */

const pageBody = document.body;
const dynamicPage = document.getElementById('dynamic-page');

// Get current date and time

// eslint-disable-next-line no-undef
const { DateTime } = luxon;
const dt = DateTime.now();

// Build functions to hide, create and show dynamic pages

function hidePage(page) {
  page.classList.remove('d-flex');
  page.classList.add('d-none');
}

function unselectLink(link) {
  link.classList.remove('link-primary');
  link.classList.add('link-dark');
}

function hideDynamicElements() {
  if (booksPage.classList.contains('d-flex')) {
    hidePage(booksPage);
    unselectLink(booksPageLink);
  } else if (formPage.classList.contains('d-flex')) {
    hidePage(formPage);
    unselectLink(formPageLink);
  } else if (contactPage.classList.contains('d-flex')) {
    hidePage(contactPage);
    unselectLink(contactPageLink);
  }
}

function createBooksPage() {
  const booksPage = document.createElement('section');
  booksPage.id = 'books-page';
  booksPage.className = 'container d-flex flex-column justify-content-center align-items-center';
  booksPage.innerHTML = `
  <div class="p-3 mt-3 mb-1">
    <h1 class="fw-bold">All awesome books</h1>
  </div>

  <section id="book-list" class="container-fluid p-0 d-flex-flex-column rounded-2"></section>`;

  dynamicPage.appendChild(booksPage);
}

function showBooksPage() {
  hideDynamicElements();
  booksPageLink.classList.remove('link-dark');
  booksPageLink.classList.add('link-primary');
  booksPage.classList.remove('d-none');
  booksPage.classList.add('d-flex');
}

function createAddBookForm() {
  const form = document.createElement('section');
  form.id = 'form-page';
  form.className = 'container d-none flex-column align-items-center gap-5 mt-4 mb-5 pb-5';
  form.innerHTML = `
  <h2 class="fs-1 fw-bold mb-3">Add a new book</h2>

  <form method="post" id="add-book" class="d-flex flex-column gap-5">
    <label>
      <input type="text" id="title" maxlength="60" placeholder="Title" class="border-4 border-dark rounded-3 fs-2 fw-bold px-2" required />
    </label>

    <label>
      <input type="text" id="author" maxlength="30" placeholder="Author" class="border-4 border-dark rounded-3 fs-2 fw-bold px-2" required />
    </label>

    <button type="submit" class="fs-4 align-self-end bg-white px-3">Add</button>
  </form>`;

  dynamicPage.appendChild(form);
}

function showAddBookForm() {
  hideDynamicElements();
  formPageLink.classList.remove('link-dark');
  formPageLink.classList.add('link-primary');
  formPage.classList.remove('d-none');
  formPage.classList.add('d-flex');
}

function createContactPage() {
  const contactPage = document.createElement('section');
  contactPage.id = 'contact-page';
  contactPage.className = 'd-none flex-column justify-content-center align-items-center mt-4 mb-5 pb-5 gap-5';
  contactPage.innerHTML = `
  <h2 class="fs-1 fw-bold mb-5">Contact Information</h2>

  <p class="fs-3 fw-bold">
    Do you have any questions or you just want to say "Hello"?
    <br />You can reach out to us!
  </p>

  <ul class="d-flex flex-column mb-5 pb-5">
    <li class="fs-3 fw-bold">Our e-mail: mail@mail.com</li>
    <li class="fs-3 fw-bold">Our phone number: 0043586534422</li>
    <li class="fs-3 fw-bold">Our address: Streetname 22, 84503, City, Country</li>
  </ul>`;

  dynamicPage.appendChild(contactPage);
}

function showContactPage() {
  hideDynamicElements();
  contactPageLink.classList.remove('link-dark');
  contactPageLink.classList.add('link-primary');
  contactPage.classList.remove('d-none');
  contactPage.classList.add('d-flex');
}

// Add books collection functionality

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
  if (bookNum % 2 === 0) {
    bookDiv.classList.add(`book-${bookId}`, 'grey-background');
  } else {
    bookDiv.classList.add(`book-${bookId}`);
  }

  bookDiv.innerHTML = `
  <div class="d-flex flex-row justify-content-between align-items-center py-2 px-3">
    <h2 class="fs-3 fw-bold"><span></span> by <span></span></h2>
    <button type="button" class="fs-5 px-3 bg-white" onmousedown="removeBook(${bookId})">Remove</button>
  </div>`;

  const bookInfo = bookDiv.querySelector('h2');
  bookInfo.children[0].textContent = `${title}`;
  bookInfo.children[1].textContent = `${author}`;

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

function checkBorder() {
  if (books.length !== 0) {
    bookList.classList.add('border', 'border-dark', 'border-4');
  } else {
    bookList.classList.remove('border', 'border-dark', 'border-4');
  }
}

function saveBooksToLocalStorage() {
  books = booksObj.books;
  checkBorder();
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(bookId) {
  booksObj.removeBookFromArray(bookId);
  saveBooksToLocalStorage();

  bookList.innerHTML = '';
  displayCurrentBooks();
}

// Create dynamic elements on page load

createBooksPage();
createAddBookForm();
createContactPage();

const dateAndTime = document.getElementById('date-and-time');
const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('add-book');
const booksPage = document.getElementById('books-page');
const booksPageLink = document.getElementById('books-page-link');
const formPage = document.getElementById('form-page');
const formPageLink = document.getElementById('form-page-link');
const contactPage = document.getElementById('contact-page');
const contactPageLink = document.getElementById('contact-page-link');

dateAndTime.textContent = `${dt.toLocaleString(DateTime.DATETIME_MED)}`;

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const currentTitle = bookForm.elements.title.value;
  const currentAuthor = bookForm.elements.author.value;

  bookForm.reset();

  booksObj.createBook(currentTitle, currentAuthor);
  saveBooksToLocalStorage();
  addBookToPage(currentTitle, currentAuthor, books.length - 1);
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  checkBorder();
  displayStoredBooks();
}
