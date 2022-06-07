const pageBody = document.body;

// Create main page elements

const mainPage = document.createElement('section');
mainPage.id = 'main-page';
mainPage.innerHTML = `
  <header>
    <h1>Awesome Books</h1>
  </header>

  <section id="book-list"></section>

  <section id="form-section">
    <form method="post" id="add-book">
      <label>
        <input type="text" id="title" maxlength="60" placeholder="Title" required />
      </label>

      <label>
        <input type="text" id="author" maxlength="30" placeholder="Author" required />
      </label>

      <button type="submit">Add</button>
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


    bookDiv.innerHTML = `
      <h2></h2>
      <h3></h3>
      <button type="button" onmousedown="removeBook(${bookNum})">Remove</button>`;

    bookDiv.children[0].textContent = `${book.title}`;
    bookDiv.children[1].textContent = `${book.author}`;

    bookList.appendChild(bookDiv);
  });
}

function refreshBookList() {
  bookList.innerHTML = '';
  displayBooks();
}

function addBook() {
  const currentTitle = bookForm.elements.title.value;
  const currentAuthor = bookForm.elements.author.value;

  books.push(
    {
      title: `${currentTitle}`,
      author: `${currentAuthor}`,
    },
  );
  refreshBookList();
}

function saveBooksToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

// eslint-disable-next-line no-unused-vars
function removeBook(bookNumber) {
  books.splice(bookNumber, 1);
  refreshBookList();
  saveBooksToLocalStorage();
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  bookForm.reset();
  saveBooksToLocalStorage();
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  displayBooks();
}
