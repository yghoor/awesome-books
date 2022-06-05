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
