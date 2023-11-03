window.onload = solution;

function solution() {
    let mainElement = document.querySelector('#main');
    let listUrl = "http://localhost:3030/jsonstore/advanced/articles/list";

    fetch(listUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((data) => {
            data.forEach(article => {
                let id = article._id;
                let title = article.title;

                let accordionDiv = document.createElement('div');
                accordionDiv.classList.add("accordion");
                mainElement.appendChild(accordionDiv);

                let accordionHtml = `<div class="head">
                    <span>${title}</span>
                    <button class="button" id="${id}">More</button>
                </div>
                <div class="extra">
                    <p></p>
                </div>`;

                accordionDiv.innerHTML = accordionHtml;

                let button = accordionDiv.querySelector('button');
                button.addEventListener("click", toggleInfo);
                button.style.cursor = "pointer";
            });
        })
        .catch((err) => {
            console.log(err);
        });
    
    function toggleInfo(event) {
        let currentButton = event.currentTarget;
        let currentArticle = currentButton.parentNode.parentNode;
        let extraDiv = currentArticle.querySelector('div.extra');
        let currentContentParagraph = extraDiv.querySelector('p');
        let currentId = currentButton.id;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${currentId}`;

        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.status);
                }
            })
            .then((data) => {
                currentContentParagraph.textContent = data.content;
            })
            .catch((err) => {
                console.log(err);
            });

        if (currentButton.textContent === "More") {
            extraDiv.style.display = 'block';
            currentButton.textContent = "Less";
        } else {
            extraDiv.style.display = 'none';
            currentButton.textContent = "More";
        }
    }
}