window.addEventListener("load", setActive);
window.addEventListener("load", addNewUser);
let userDiv = document.querySelector('#user');
userDiv.style.display = "none";

function setActive() {
    let currentUrl = window.location.href;
    let identifier = currentUrl.split("/").pop().split(".").shift();
    let idUrlRelation = {
        home: "index",
        login: "login",
        register: "register"
    }

    let navButtons = Array.from(document.querySelectorAll("nav a"));
    navButtons.forEach(element => {
        if (identifier === idUrlRelation[element.id]) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
}

function addNewUser() {
    let registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", onRegister);

    async function onRegister(regEvent) {
        regEvent.preventDefault();
        let formData = new FormData(regEvent.currentTarget);
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

        if (inputIsValid) {
            try {
                const regResponse = await fetch(
                    "http://localhost:3030/users/register",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    }
                );

                if (regResponse.status != "200") {
                    throw new Error(`${regResponse.status}: ${regResponse.statusText}`);
                }

                const regData = await regResponse.json();

                sessionStorage.setItem("userId", regData._id);
                sessionStorage.setItem("userEmail", regData.email);
                sessionStorage.setItem("userToken", regData.accessToken);

                // alert("Congratulations! Are are now a registered user!");
                location.assign("./index.html");
            } catch (error) {
                alert(error);
            }
        }
    }
}