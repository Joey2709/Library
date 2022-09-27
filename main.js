const mainContainer = document.getElementById("main-container");
const bookMain = document.createElement("div");
mainContainer.appendChild(bookMain).classList.add("book-main");

var titleValue = document.getElementById("title");
var authorValue = document.getElementById("author");
var pagesValue = document.getElementById("pages");
var statusRead = document.getElementById("status");

let myLibrary = [];

var countBooks = 1;

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}
function defaultValue() {
  titleValue.value = "";
  authorValue.value = "";
  pagesValue.value = "";
  statusRead.textContent = "Read";
}

statusRead.addEventListener("click", currentStatus);

function currentStatus() {
  if (statusRead.textContent == "Read") {
    statusRead.textContent = "No read";
  } else {
    statusRead.textContent = "Read";
  }
}

function createBookContainer(title, author, pages) {
  const bookContainer = document.createElement("div");
  const titleBook = document.createElement("p");
  const authorBook = document.createElement("p");
  const pagesBook = document.createElement("p");
  const readBook = document.createElement("p");
  const deleteButton = document.createElement("button");
  const statusButton = document.createElement("button");
  const updateButton = document.createElement("button");

  bookMain.appendChild(bookContainer).classList.add(`book-${countBooks}`);
  bookContainer.appendChild(titleBook).classList.add(`title-${countBooks}`);
  bookContainer.appendChild(authorBook).classList.add(`author-${countBooks}`);
  bookContainer.appendChild(pagesBook).classList.add(`pages-${countBooks}`);
  bookContainer.appendChild(readBook).classList.add(`read-${countBooks}`);
  bookContainer.appendChild(deleteButton);
  bookContainer.appendChild(statusButton);
  bookContainer.appendChild(updateButton).classList.add(`book-${countBooks}`);

  deleteButton.textContent = "Delete";
  statusButton.textContent = "Change Status";
  updateButton.textContent = "Update";

  titleBook.textContent = `Title: ${title}`;
  authorBook.textContent = `Author: ${author}`;
  pagesBook.textContent = `Pages: ${pages}`;
  readBook.textContent = `Status: ${statusRead.textContent}`;

  /*DELETE BOOK CREATED*/
  deleteButton.addEventListener("click", deleteBook);
  function deleteBook() {
    bookContainer.remove();
    countBooks -= 1;
    let aux = document.getElementsByClassName("book-main");
    for (let node of aux[0].childNodes) {
      node.classList.remove(...node.classList);
      node.classList.add(
        `book-${Array.from(aux[0].childNodes).findIndex((e) => e == node) + 1}`
      );
      node.childNodes[6].classList.remove(...node.childNodes[6].classList);
      node.childNodes[6].classList.add(
        `book-${Array.from(aux[0].childNodes).findIndex((e) => e == node) + 1}`
      );
    }
  }
  /*STATUS READ BOOK CREATED*/
  statusButton.addEventListener("click", change);
  function change() {
    readBook.textContent == "Status: Read"
      ? (readBook.textContent = "Status: No Read")
      : (readBook.textContent = "Status: Read");
  }
}

function addBookToLibrary(title, author, pages) {
  title = titleValue.value;
  author = authorValue.value;
  pages = pagesValue.value;
  myLibrary.push(new Book(title, author, pages));
  createBookContainer(title, author, pages);
  countBooks += 1;
  offModal();
}

function deleteAll() {
  bookMain.innerHTML = "";
  countBooks = 1;
}

defaultValue();

var modalContainer = document.getElementsByClassName("modal-container")[0];
var modalOpen = document.getElementsByClassName("modal")[0];

function onModal() {
  const submit = document.getElementById("submit");
  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";
  submit.textContent = "Submit";
  modalOpen.classList.toggle("modal-close");
  defaultValue();
}

function offModal() {
  modalOpen.classList.toggle("modal-close");
  setTimeout(function () {
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  }, 600);
}

window.addEventListener("click", function (e) {
  if (e.target == modalContainer) {
    offModal();
  }
});

/*Update*/
var submitButton = document.getElementById("submit");

/*prueba = cambia las funciones que usará los click */
submitButton.addEventListener("click", changeFunction);
var classBook = "";

window.addEventListener("click", function (e) {
  let regex = /^book-[0-9]+$/;
  if (regex.test(e.target.classList[0])) {
    classBook = e.target.classList[0];
    validateNodes(classBook);
  }
});

function validateNodes(bookSelect) {
  if (bookMain.childNodes.length > 0) {
    let getButtonUpdate = document.getElementsByClassName(`${bookSelect}`);
    getButtonUpdate[1].onclick = onModal();
    getButtonUpdate[1].onclick = changeText();
    getButtonUpdate[1].onclick = recoverData();
  }
}

function changeText() {
  submitButton.textContent = "Update";
}

function changeFunction() {
  if (submitButton.textContent == "Update") {
    submitButton.onclick = update();
  } else if (submitButton.textContent == "Submit") {
    submitButton.onclick = addBookToLibrary(title, author, pages);
  }
}

function update() {
  let getBookUpdate = document.getElementsByClassName(`${classBook}`);
  getBookUpdate[0].childNodes[0].textContent = `Title: ${titleValue.value}`;
  getBookUpdate[0].childNodes[1].textContent = `Author: ${authorValue.value}`;
  getBookUpdate[0].childNodes[2].textContent = `Pages: ${pagesValue.value}`;
  getBookUpdate[0].childNodes[3].textContent = `Status: ${statusRead.textContent}`;
  offModal();
}

function recoverData() {
  let getBookUpdate = document.getElementsByClassName(`${classBook}`);
  let regex = /[^Title: |^Author: |^Pages: |^Status: ].+/g;
  let stringTitle = getBookUpdate[0].childNodes[0].textContent;
  let stringAuthor = getBookUpdate[0].childNodes[1].textContent;
  let stringPages = getBookUpdate[0].childNodes[2].textContent;
  let stringStatus = getBookUpdate[0].childNodes[3].textContent;
  titleValue.value =
    stringTitle.match(regex) == null ? "" : stringTitle.match(regex)[0];
  authorValue.value =
    stringAuthor.match(regex) == null ? "" : stringAuthor.match(regex)[0];
  pagesValue.value =
    stringPages.match(regex) == null ? "" : stringPages.match(regex)[0];
  statusRead.textContent =
    stringStatus.match(regex) == null ? "" : stringStatus.match(regex)[0];
}
