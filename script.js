const bookForm = document.querySelector("#bookDetails")
const display = document.querySelector("#display-books")
const newbookBtn = document.querySelector("#addNewBook")

const myLibrary = []

newbookBtn.addEventListener("click", () => {
    bookForm.style.display = "block"
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(bookForm);

    const newBook = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("bookDescription"),
        formData.get("status")
    )

    addBookToLibrary(newBook)
    displayBooks()

    bookForm.reset()
    bookForm.style.display = "none"
})

class Book {
    constructor(title, author, pages, about, status) {
        this.id = crypto.randomUUID()
        this.title = title
        this.author = author
        this.pages = pages
        this.about = about
        this.status = status
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBooks() {
    display.innerHTML = ""

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div")

        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Description: ${book.about}</p>
        <p>Status: ${book.status}</p>
        `

        display.appendChild(bookCard)
    })
}