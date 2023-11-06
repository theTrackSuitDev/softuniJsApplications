window.addEventListener("load", addNewUser);

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

                const regData = await regResponse.json();

                localStorage.setItem("userId", regData._id);
                localStorage.setItem("userEmail", regData.email);
                localStorage.setItem("userToken", regData.accessToken);

                alert("Congratulations! Are are now a registered user!");
                location.assign("./index.html");
            } catch (error) {
                alert(`Bad Response`);
            }
        }
    }
}