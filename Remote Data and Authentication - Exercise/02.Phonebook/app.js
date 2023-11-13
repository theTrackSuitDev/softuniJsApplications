function attachEvents() {
    let phoneList = document.querySelector("#phonebook");
    let loadButton = document.querySelector("#btnLoad");
    let personField = document.querySelector("#person");
    let phoneField = document.querySelector("#phone");
    let createButton = document.querySelector("#btnCreate");
    let url = "http://localhost:3030/jsonstore/phonebook";

    loadButton.addEventListener("click", load);
    async function load() {
        try {
            phoneList.innerHTML = "";
            let res = await fetch(url);
            if (res.status != "200") {
                throw new Error(`Error: ${res.status}`);
            }

            let phoneData = await res.json();
            for (const key in phoneData) {
                let name = phoneData[key].person;
                let number = phoneData[key].phone;
                let id = key;
                let newItem = document.createElement("li");
                newItem.id = id;
                let line = `${name}: ${number}`;
                newItem.textContent = line;
                phoneList.appendChild(newItem);

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                deleteButton.textContent = "Delete";
                newItem.appendChild(deleteButton);

                deleteButton.addEventListener("click", deleteRecord);
            }
        } catch (error) {
            console.log(error);
        }

        async function deleteRecord(event) {
            try {
                let id = event.currentTarget.parentNode.id;
                let deleteUrl = url + "/" + id;
                let res = await fetch(deleteUrl, {
                    method: "DELETE",
                });
                if (res.status != "200") {
                    throw new Error(`Error: ${res.status}`);
                }

                load();
            } catch (error) {
                console.log(error);
            }
        }
    }

    createButton.addEventListener("click", addPhone);
    async function addPhone() {
        try {
            let person = personField.value;
            let phone = phoneField.value;
            if (person === "" || phone === "") {
                alert("Both fields are required!");
                return;
            }

            let phoneEntry = {
                person,
                phone,
            };

            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(phoneEntry),
            });

            if (res.status != "200") {
                throw new Error(`Error: ${res.status}`);
            }

            personField.value = "";
            phoneField.value = "";
            load();
        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();