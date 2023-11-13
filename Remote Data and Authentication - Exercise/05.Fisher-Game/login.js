// Set user/guest navigation
let guestDiv = document.querySelector("#guest");
let userDiv = document.querySelector("#user");
let userToken = sessionStorage.getItem("userToken");
let userEmail = document.querySelector("p.email span");

if (userToken) {
    userDiv.style.display = "inline-block";
    guestDiv.style.display = "none";
    userEmail.textContent = sessionStorage.getItem("userEmail");
} else {
    userDiv.style.display = "none";
    guestDiv.style.display = "inline-block";
    userEmail.textContent = "guest";
}

// Set active navigation
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


// Login
let loginForm = document.querySelector("form");
loginForm.addEventListener("submit", tryLogin);

async function tryLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);

    let email = formData.get("email");
    let password = formData.get("password");

    let inputIsValid = true;

    if (email === "" || password === "") {
        inputIsValid = false;
        alert("Email/Password are required!");
    }

    if (inputIsValid) {
        try {
            const loginRes = await fetch("http://localhost:3030/users/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (loginRes.status != "200") {
                throw new Error(`${loginRes.status}: ${loginRes.statusText}`);
            }

            const loginData = await loginRes.json();

            sessionStorage.setItem("userId", loginData._id);
            sessionStorage.setItem("userEmail", loginData.email);
            sessionStorage.setItem("userToken", loginData.accessToken);

            //alert("You logged in successfully!");
            location.assign("./index.html");
        } catch (error) {
            alert(error);
        }
    }
}
