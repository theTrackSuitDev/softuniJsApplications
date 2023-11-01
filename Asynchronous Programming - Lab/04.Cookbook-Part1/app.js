window.onload = loadRecipes;

function loadRecipes() {
    const url = "http://localhost:3030/jsonstore/cookbook/recipes";

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => {
            const mainElement = document.querySelector("main");

            for (const object in data) {
                let name = data[object].name;
                let imgUrl = data[object].img;

                let recipeArticle = document.createElement("article");
                recipeArticle.classList.add("preview");
                recipeArticle.addEventListener("click", expandRecipe);
                mainElement.appendChild(recipeArticle);

                let titleDiv = document.createElement("div");
                titleDiv.classList.add("title");
                recipeArticle.appendChild(titleDiv);

                let h2Title = document.createElement("h2");
                h2Title.textContent = name;
                titleDiv.appendChild(h2Title);

                let imgDiv = document.createElement("div");
                imgDiv.classList.add("small");
                recipeArticle.appendChild(imgDiv);

                let imgElement = document.createElement("img");
                imgElement.src = imgUrl;
                imgDiv.appendChild(imgElement);
            }
        })
        .catch((err) => console.log(`Error: \n${err}`))
        .finally(() => {
            let loader = document.querySelector("main p");
            loader.remove();
        });
}

function expandRecipe(event) {
    let clicked = event.currentTarget;
    let name = clicked.querySelector(".title h2").textContent;
    let imgUrl = clicked.querySelector(".small img").getAttribute("src");
    let id = `0${name.slice(-1)}`;
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;

    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then((data) => {
        let steps = data.steps;
        let ingredients = data.ingredients;

        let newArticle = document.createElement("article");

        let h2Title = document.createElement("h2");
        h2Title.textContent = name;
        newArticle.appendChild(h2Title);

        let bandDiv = document.createElement("div");
        bandDiv.classList.add("band");
        newArticle.appendChild(bandDiv);

        let imgDiv = document.createElement("div");
        imgDiv.classList.add("thumb");
        bandDiv.appendChild(imgDiv);

        let imgElement = document.createElement("img");
        imgElement.src = imgUrl;
        imgDiv.appendChild(imgElement);

        let ingredientsDiv = document.createElement("div");
        ingredientsDiv.classList.add("ingredients");
        bandDiv.appendChild(ingredientsDiv);

        let ingredientsHeading = document.createElement("h3");
        ingredientsHeading.textContent = "Ingredients:";
        ingredientsDiv.appendChild(ingredientsHeading);

        let ingredientsUl = document.createElement("ul");
        ingredientsDiv.appendChild(ingredientsUl);

        ingredients.forEach(element => {
            let newLi = document.createElement("li");
            newLi.textContent = element;
            ingredientsUl.appendChild(newLi);
        });

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");
        newArticle.appendChild(descriptionDiv);

        let descriptionHeading = document.createElement("h3");
        descriptionHeading.textContent = "Preparation:";
        descriptionDiv.appendChild(descriptionHeading);

        steps.forEach(element => {
            let newP = document.createElement("p");
            newP.textContent = element;
            descriptionDiv.appendChild(newP);
        });
                
        clicked.style.display = "none";
        clicked.insertAdjacentElement("afterend", newArticle);
        newArticle.style.cursor = 'pointer';
        newArticle.addEventListener("click", toggle);
    })
    .catch((err) => console.log(`Error: \n${err}`));
}

function toggle(event) {
    event.currentTarget.previousSibling.style.display = 'block';
    event.currentTarget.remove();
}