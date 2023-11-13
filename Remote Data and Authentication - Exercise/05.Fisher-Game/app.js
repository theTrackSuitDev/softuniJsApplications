// Clear initial catches
let catchesFieldset = document.querySelector("#main");
let homeSection = document.querySelector("#home-view");

catchesFieldset.style.border = "none";
catchesFieldset.innerHTML = "";
catchesFieldset.textContent = "Click to view catches";

// Set active Navigation
let currentUrl = window.location.href;
let identifier = currentUrl.split("/").pop().split(".").shift();
let idUrlRelation = {
    home: "index",
    login: "login",
    register: "register",
};

let navButtons = Array.from(document.querySelectorAll("nav a"));
navButtons.forEach((element) => {
    if (identifier === idUrlRelation[element.id]) {
        element.classList.add("active");
    } else {
        element.classList.remove("active");
    }
});

// Set user/guest navigation
let guestDiv = document.querySelector("#guest");
let userDiv = document.querySelector("#user");
let userToken = sessionStorage.getItem("userToken");
let userEmail = document.querySelector("p.email span");
let addButton = document.querySelector("button.add");

if (userToken) {
    userDiv.style.display = "inline-block";
    guestDiv.style.display = "none";
    userEmail.textContent = sessionStorage.getItem("userEmail");
    addButton.disabled = false;
} else {
    userDiv.style.display = "none";
    guestDiv.style.display = "inline-block";
    userEmail.textContent = "guest";
    addButton.disabled = true;
}

// Logout functionality
const logOutButton = document.querySelector("#logout");
logOutButton.addEventListener("click", async () => {
    const userToken = sessionStorage.userToken;
    try {
        await fetch("http://localhost:3030/users/logout", {
            method: "GET",
            headers: {
                "X-Authorization": userToken,
            },
        });
    } catch (error) {
        console.log(error);
    }

    sessionStorage.clear();
    //alert("You logged out successfully!");
    location.assign("./index.html");
});

// Load catches
let loadButton = document.querySelector("button.load");
loadButton.addEventListener("click", loadCatches);
async function loadCatches() {
    let url = "http://localhost:3030/data/catches";
    try {
        let res = await fetch(url);
        if (res.status != "200") {
            throw new Error(`${loginRes.status}: ${loginRes.statusText}`);
        }

        catchesFieldset.innerHTML = "";
        let legend = document.createElement("legend");
        catchesFieldset.appendChild(legend);
        legend.textContent = "Catches";
        let catchesDiv = document.createElement("div");
        catchesFieldset.appendChild(catchesDiv);
        catchesDiv.id = "catches";

        let data = await res.json();
        data.forEach((element) => {
            let ownerId = element._ownerId;
            let angler = element.angler;
            let weight = element.weight;
            let species = element.species;
            let location = element.location;
            let bait = element.bait;
            let captureTime = element.captureTime;
            let catchId = element._id;

            
            let htmlTemplate = `<div class="catch" id=${catchId} data-owner-Id="${ownerId}">
            <label>Angler</label>
            <input type="text" class="angler" value="${angler}" disabled>
            <label>Weight</label>
            <input type="text" class="weight" value="${weight}" disabled>
            <label>Species</label>
            <input type="text" class="species" value="${species}" disabled>
            <label>Location</label>
            <input type="text" class="location" value="${location}" disabled>
            <label>Bait</label>
            <input type="text" class="bait" value="${bait}" disabled>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${captureTime}" disabled>
            <button class="update" data-id="${catchId}" disabled>Update</button>
            <button class="delete" data-id="${catchId}" disabled>Delete</button>
            </div>\n`;
            // TO DO: Add escape function to prevent XSS attacks!!!
            
            catchesDiv.innerHTML += htmlTemplate;
            let currentCatch = document.getElementById(catchId);
            let buttons = Array.from(currentCatch.querySelectorAll("button"));
            let fields = Array.from(currentCatch.querySelectorAll("input"));

            buttons.forEach((element) => {
                if (ownerId === sessionStorage.getItem("userId")) {
                    element.disabled = false;
                } else {
                    element.disabled = true;
                }
            });

            fields.forEach((element) => {
                if (ownerId === sessionStorage.getItem("userId")) {
                    element.disabled = false;
                } else {
                    element.disabled = true;
                }
            });
        });

        let titles = Array.from(document.querySelectorAll('#catches .catch > button')).map((s) => s.disabled);
        let result = titles.filter((x) => {
            if (x !== false) {
              return true;
            }
          });
        console.log(result.length);
    } catch (error) {
        alert(error);
    }

    let catches = Array.from(document.querySelectorAll("div.catch"));
    catches.forEach((element) => {
        let buttons = Array.from(element.querySelectorAll("button"));
        buttons.forEach((element) => {
            if (element.textContent === "Update") {
                element.addEventListener("click", updateCatch);
            } else {
                element.addEventListener("click", deleteCatch);
            }
        });
    });
}

// Add catch
let addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addCatch);
async function addCatch(event) {
    event.preventDefault();
    let url = "http://localhost:3030/data/catches";

    let formData = new FormData(event.currentTarget);
    let angler = formData.get("angler");
    let weight = formData.get("weight");
    let species = formData.get("species");
    let location = formData.get("location");
    let bait = formData.get("bait");
    let captureTime = formData.get("captureTime");

    if (
        angler === "" ||
        weight === "" ||
        species === "" ||
        location === "" ||
        bait === "" ||
        captureTime === ""
    ) {
        alert("All fields are required!");
        return;
    }

    let catchData = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
    };

    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": sessionStorage.userToken,
        },
        body: JSON.stringify(catchData),
    });

    if (res.status != "200") {
        throw new Error(`Error: ${res.status}`);
    }

    let fields = Array.from(event.target.parentNode.querySelectorAll("input"));
    fields.forEach((element) => {
        element.value = "";
    });

    loadCatches();
}

// Update catch
async function updateCatch(event) {
    let id = event.currentTarget.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;
    let currentCatch = event.currentTarget.parentNode;

    let angler = currentCatch.querySelector("input.angler").value;
    let weight = currentCatch.querySelector("input.weight").value;
    let species = currentCatch.querySelector("input.species").value;
    let location = currentCatch.querySelector("input.location").value;
    let bait = currentCatch.querySelector("input.bait").value;
    let captureTime = currentCatch.querySelector("input.captureTime").value;

    if (
        angler === "" ||
        weight === "" ||
        species === "" ||
        location === "" ||
        bait === "" ||
        captureTime === ""
    ) {
        alert("All fields are required!");
        return;
    }

    let catchData = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
    };

    let res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": sessionStorage.userToken,
        },
        body: JSON.stringify(catchData),
    });

    if (res.status != "200") {
        throw new Error(`Error: ${res.status}`);
    }

    //alert('Catch successfully updated!');
    loadCatches();
}

// Delete catch
async function deleteCatch(event) {
    let id = event.currentTarget.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;

    let res = await fetch(url, {
        method: "DELETE",
        headers: {
            "X-Authorization": sessionStorage.userToken,
        },
    });

    if (res.status != "200") {
        throw new Error(`Error: ${res.status}`);
    }

    //alert('Catch successfully deleted!');
    loadCatches();
}