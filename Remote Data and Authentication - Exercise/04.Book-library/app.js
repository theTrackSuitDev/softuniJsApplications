let url = "http://localhost:3030/jsonstore/collections/books";
let tableBody = document.querySelector("tbody");
tableBody.innerHTML = "";
let loadButton = document.querySelector("#loadBooks");
let addForm = document.querySelector("form");
let formButton = addForm.querySelector("button");
formButton.style.cursor = "pointer";
formButton.addEventListener("click", addBook);
let titleField = document.querySelector("input[name='title']");
let authorField = document.querySelector("input[name='author']");
titleField.value = "";
authorField.value = "";
loadButton.addEventListener("click", loadBooks);

async function loadBooks() {
    try {
        let res = await fetch(url);
        if (res.status != "200") {
            throw new Error(`Error: ${res.status}`);
        }

        let data = await res.json();
        tableBody.innerHTML = "";
        for (const entry in data) {
            let author = data[entry].author;
            let title = data[entry].title;
            let id = entry;

            let newRow = document.createElement("tr");
            newRow.id = id;
            tableBody.appendChild(newRow);

            let titleData = document.createElement("td");
            titleData.textContent = title;
            newRow.appendChild(titleData);

            let authorData = document.createElement("td");
            authorData.textContent = author;
            newRow.appendChild(authorData);

            let actionData = document.createElement("td");
            newRow.appendChild(actionData);

            let editButton = document.createElement("button");
            actionData.appendChild(editButton);
            editButton.classList.add("editBtn");
            editButton.textContent = "Edit";
            editButton.style.cursor = "pointer";
            editButton.addEventListener("click", editBook);

            let deleteButton = document.createElement("button");
            actionData.appendChild(deleteButton);
            deleteButton.classList.add("deleteBtn");
            deleteButton.textContent = "Delete";
            deleteButton.style.cursor = "pointer";
            deleteButton.addEventListener("click", deleteBook);
        }
    } catch (error) {
        alert(error);
    }
}

function editBook(event) {
    let editId = event.currentTarget.parentNode.parentNode.id;

    let formTitle = addForm.querySelector("h3");
    formTitle.textContent = "Edit FORM";

    let tableDataArray = Array.from(
        event.currentTarget.parentNode.parentNode.querySelectorAll("td")
    );

    let titleToEdit = tableDataArray[0].textContent;
    let authorToEdit = tableDataArray[1].textContent;

    titleField.value = titleToEdit;
    authorField.value = authorToEdit;

    formButton.textContent = "Save";
    formButton.removeEventListener("click", addBook);
    formButton.addEventListener("click", editBookData);

    async function editBookData(event) {
        event.preventDefault();
        let title = titleField.value;
        let author = authorField.value;
        if (title === "" || author === "") {
            alert("Both fields are required!");
            return;
        }

        let newData = {
            author,
            title,
        };

        let res = await fetch(url + "/" + editId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newData),
        });

        if (res.status != "200") {
            throw new Error(`Error: ${res.status}`);
        }

        titleField.value = "";
        authorField.value = "";
        formTitle.textContent = "FORM";
        formButton.textContent = "Submit";
        formButton.removeEventListener("click", editBookData);
        formButton.addEventListener("click", addBook);
        loadBooks();
    }
}

async function deleteBook(event) {
    let deleteId = event.currentTarget.parentNode.parentNode.id;
    let res = await fetch(url + "/" + deleteId, {
        method: "DELETE",
    });

    if (res.status != "200") {
        throw new Error(`Error: ${res.status}`);
    }

    loadBooks();
}

async function addBook(event) {
    event.preventDefault();

    let author = authorField.value;
    let title = titleField.value;

    if (title === "" || author === "") {
        alert("Both fields are required!");
        return;
    }

    let newBook = {
        author,
        title,
    };

    let res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(newBook),
    });

    if (res.status != "200") {
        throw new Error(`Error: ${res.status}`);
    }

    titleField.value = "";
    authorField.value = "";
    loadBooks();
}
