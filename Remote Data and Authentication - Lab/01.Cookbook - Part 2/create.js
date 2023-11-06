window.addEventListener("load", createRecipe);

function createRecipe() {
    let createForm = document.querySelector("form");
    createForm.addEventListener("submit", addRecipe);

    async function addRecipe(event) {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let name = formData.get("name");
        let img = formData.get("img");
        let ingredients = formData.get("ingredients").split("\n");
        let steps = formData.get("steps").split("\n");

        let recipeData = {
            name,
            img,
            ingredients,
            steps
        }

        let inputIsValid = true;

        if (name === "" || img === "" || ingredients[0] === "" || steps[0] === "") {
            inputIsValid = false;
            alert("Invalid input data!");
        }

        if (inputIsValid) {
            try {
                const recipeResponse = await fetch(
                    "http://localhost:3030/data/recipes",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "X-Authorization": localStorage.userToken
                        },
                        body: JSON.stringify(recipeData),
                    }
                );

                const resData = await recipeResponse.json();

                if (recipeResponse.status != "200") {
                    console.log(resData);
                    alert(`${recipeResponse.status}: ${recipeResponse.statusText}`);
                } else {  
                    alert("Recipe added successfully!");
                    location.assign("./index.html");
                }

            } catch (error) {
                alert(`Bad Response`);
            }
        }
    }
}