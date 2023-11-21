import { html, render } from "../../node_modules/lit-html/lit-html.js";

export function loadPage() {
    let pageTemplate = html`
<button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="container">
        </tbody>
    </table>

    <form @submit=${addBook} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>

    <form @submit=${updateBook} style="display:none" id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input id="editTitle" type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input id="editAuthor" type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;

render(pageTemplate, document.querySelector("body"));
}

export const url = "http://localhost:3030/jsonstore/collections/books";

export async function loadBooks() {
    let booksContainer = document.querySelector("#container");
    booksContainer.replaceChildren();
    
    let bookRowTemplate = (id, title, author) => html`
                <tr>
                    <td class="title">${title}</td>
                    <td class="author">${author}</td>
                    <td id=${id}>
                        <button @click=${editBook}>Edit</button>
                        <button @click=${deleteBook}>Delete</button>
                    </td>
                </tr>
    `;

    let res = await fetch(url);
    let books = await res.json();
    for (const id in books) {
        let fragment = document.createDocumentFragment();
        let title = books[id].title;
        let author = books[id].author;

        render(bookRowTemplate(id, title, author), fragment);
        booksContainer.appendChild(fragment);
    }
}

export async function addBook(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let author = formData.get("author");

    if (title === "" || author === "") {
        alert("Both fields are required!");
        return;
    }

    let newBook = {
        author,
        title
    }

    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    });

    let data = await res.json();

    event.target.reset();
    loadBooks();
}

let bookId;
let addForm;
let editForm;
export async function editBook(event) {
    bookId = event.target.parentNode.id;
    addForm = document.querySelector('#add-form');
    editForm = document.querySelector('#edit-form');
    addForm.style.display = "none";
    editForm.style.display = "";

    let currentAuthor = event.target.parentNode.parentNode.querySelector(".author").textContent;
    let currentTitle = event.target.parentNode.parentNode.querySelector(".title").textContent;

    editForm.querySelector("#editTitle").value = currentTitle;
    editForm.querySelector("#editAuthor").value = currentAuthor;
}

async function updateBook(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let author = formData.get("author");
    let editedBook = {
        author,
        title
    }

    let res = await fetch(`${url}/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBook)
    });

    let data = await res.json();

    addForm.style.display = "";
    editForm.style.display = "none";
    loadBooks();


}

export async function deleteBook(event) {
    let bookId = event.target.parentNode.id;
    let res = await fetch(`${url}/${bookId}`, {
        method: "DELETE"
    });

    let data = await res.json();
    loadBooks();
}
