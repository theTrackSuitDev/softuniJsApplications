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

// Register
let registerForm = document.querySelector("form");
let regButton = registerForm.querySelector("button");
regButton.addEventListener("click", onRegister);

async function onRegister(regEvent) {
    regEvent.preventDefault();
    let formData = new FormData(registerForm);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("rePass");
    let inputIsValid = true;

    if (email === "" || password === "") {
        inputIsValid = false;
        alert("Email/Password are required!");
    }

    if (password !== rePass) {
        inputIsValid = false;
        alert("Password is not repeated correctly!");
    }

    try {
        const regResponse = await fetch(
            "http://localhost:3030/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!regResponse.ok) {
            throw new Error(`${regResponse.status}: ${regResponse.statusText}`);
        }

        const regData = await regResponse.json();

        sessionStorage.setItem("userId", regData._id);
        sessionStorage.setItem("userEmail", regData.email);
        sessionStorage.setItem("userToken", regData.accessToken);

        // alert("Congratulations! Are are now a registered user!");
        location.assign("./index.html");
    } catch (error) {
        console.log(error);
    }
}