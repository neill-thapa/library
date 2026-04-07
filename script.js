const bookForm = document.querySelector(".bookDetails")
const display = document.querySelector(".display-books")

const myLibrary = []

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
})

display.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const bookCard = e.target.closest(".book-card")
        const id = bookCard.dataset.id

        deleteBook(id)
    }

    if (e.target.classList.contains("toggle-btn")) {
        const bookCard = e.target.closest(".book-card")
        if(!bookCard) return

        const id = bookCard.dataset.id

        console.log("clicked")
        toggleStatus(id)
    }
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

    toggleStatus() {
        this.status = this.status === "Read" ? "Not Read" : "Read"
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBooks() {
    display.innerHTML = ""

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div")
        bookCard.classList.add("book-card")

        bookCard.dataset.id = book.id

        bookCard.innerHTML = `
        <div class="book-info">
            <div class="card-header">
                <h3>${book.title}</h3>
            </div>
            <div class="card-body">
                <p><span class="book-keys">Author</span> : ${book.author}</p>
                <p><span class="book-keys">Pages</span> : ${book.pages}</p>
                <p><span class="book-keys">Description</span> : ${book.about}</p>
                <p class="book-status">Status : ${book.status}</p>
            </div>
        </div>
        <div class="card-buttons">
            <button class="delete-btn">Delete</button>
            <button class="toggle-btn">
            ${book.status === "Read" ? "Mark Unread" : "Mark Read"}
            </button>
        </div>
        `

        display.appendChild(bookCard)
    })
}

function deleteBook(book_id) {
    const index = myLibrary.findIndex(book => book.id === book_id)

    myLibrary.splice(index, 1) // remove only one element which is at index

    displayBooks()
}

function toggleStatus(id) {
    const book = myLibrary.find(book => book.id === id)

    console.log("inside function")
    book.toggleStatus()
    console.log(`function worked: ${book.status}`)

    displayBooks()
}