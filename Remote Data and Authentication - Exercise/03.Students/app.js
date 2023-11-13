window.addEventListener("load", loadStudents);
let url = "http://localhost:3030/jsonstore/collections/students";
let tableBody = document.querySelector("#results tbody");
let addForm = document.querySelector("#form");
addForm.addEventListener("submit", addStudent);

async function loadStudents() {
    try {
        let res = await fetch(url);
        if (res.status != "200") {
            throw new Error(`Error: ${res.status}`);
        }

        let data = await res.json();
        tableBody.innerHTML = "";
        for (const entry in data) {
            let firstName = data[entry].firstName;
            let lastName = data[entry].lastName;
            let facultyNumber = data[entry].facultyNumber;
            let grade = data[entry].grade;

            let newRow = document.createElement("tr");
            tableBody.appendChild(newRow);

            let nameData = document.createElement("td");
            nameData.textContent = firstName;
            newRow.appendChild(nameData);

            let lastNameData = document.createElement("td");
            lastNameData.textContent = lastName;
            newRow.appendChild(lastNameData);

            let numberData = document.createElement("td");
            numberData.textContent = facultyNumber;
            newRow.appendChild(numberData);

            let gradeData = document.createElement("td");
            gradeData.textContent = grade;
            newRow.appendChild(gradeData);
        }
    } catch (error) {
        alert(error);
    }
}

async function addStudent(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let facultyNumber = formData.get("facultyNumber");
    let grade = formData.get("grade");

    if (firstName === "" || lastName === "" ||
    facultyNumber === "" || grade === "") {
        alert(`All fields are required!`);
        return;
    }

    let newStudent = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    };

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newStudent),
        });

        if (res.status != "200") {
            throw new Error(`Error: ${res.status}`);
        }

    } catch (error) {
        alert(error);
    }

    document.querySelector("input[name='firstName']").value = "";
    document.querySelector("input[name='lastName']").value = "";
    document.querySelector("input[name='facultyNumber']").value = "";
    document.querySelector("input[name='grade']").value = "";

    loadStudents();
}