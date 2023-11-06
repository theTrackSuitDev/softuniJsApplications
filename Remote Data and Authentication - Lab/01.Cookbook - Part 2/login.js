window.addEventListener("load", login);

function login() {
    let loginForm = document.querySelector('form');
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
                const loginRes = await fetch(
                    "http://localhost:3030/users/login",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    }
                );

                const loginData = await loginRes.json();
                
                if (loginRes.status != "200") {
                    alert(`${loginData.message}`);
                } else {
                    localStorage.setItem("userId", loginData._id);
                    localStorage.setItem("userEmail", loginData.email);
                    localStorage.setItem("userToken", loginData.accessToken);
    
                    alert("You logged in successfully!");
                    location.assign("./index.html");
                }

            } catch (error) {
                alert(`${loginRes.status}: ${loginRes.statusText}`);
            }
        }
    }
}