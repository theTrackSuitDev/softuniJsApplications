import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const catsContainer = document.querySelector("#allCats");
let template = (cats) => html`
    <ul>
        ${cats.map(
            (cat) => html`
                <li>
                    <img
                        src="./images/${cat.imageLocation}.jpg"
                        width="250"
                        height="250"
                        alt="Card image cap"
                    />
                    <div class="info">
                        <button class="showBtn" @click=${showDetails}>Show status code</button>
                        <div class="status" style="display: none" id="${cat.id}">
                            <h4>Status Code: ${cat.statusCode}</h4>
                            <p>${cat.statusMessage}</p>
                        </div>
                    </div>
                </li>
            `
        )}
    </ul>
`;

function showDetails(event) {
    const detailsDiv = event.target.parentNode.querySelector(".status");
    if (detailsDiv.style.display === "none") {
        detailsDiv.style.display = "block";
        event.target.textContent = "Hide status code";
    } else {
        detailsDiv.style.display = "none";
        event.target.textContent = "Show status code";
    }
}

render(template(cats), catsContainer);