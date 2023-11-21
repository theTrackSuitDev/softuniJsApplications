import { html, render } from "../../node_modules/lit-html/lit-html.js";

document.querySelector("#towns").value = "";
const listContainer = document.querySelector("#root");
const inputForm = document.querySelector(".content");
inputForm.addEventListener("submit", createList);

let template = (arr) => html`
<ul>
    ${arr.map((town) => html`
    <li>${town}</li>
    `)}
`;

function createList(event) {
    event.preventDefault(); 
    let formData = new FormData(inputForm);
    let townsArray = formData.get("towns").split(", ");
    if (townsArray[0]) {
        render(template(townsArray), listContainer);
    } else {
        alert("Invalid input!");
        return;
    }
}