import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

let searchField = document.querySelector("#searchText");
searchField.value = null;
const listContainer = document.querySelector("#towns");
const template = (towns) => html`
    <ul>
        ${towns.map((town) => html` <li >${town}</li> `)}
    </ul>
`;

render(template(towns), listContainer);

const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", search);

function search() {
   let searchText = searchField.value;
   let matches = 0;
   if (searchText) {
      const listItems = Array.from(listContainer.querySelectorAll("li"));
      listItems.forEach(element => {
         if (element.textContent.includes(searchText)) {
            element.classList.add("active");
            matches++;
         } else {
            element.classList.remove("active");
         }
      });
   }

   document.querySelector("#result").textContent = `${matches} matches found`

}