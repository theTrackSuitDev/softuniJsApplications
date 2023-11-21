import { html, render } from "../../node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/table";
const rowContainer = document.querySelector(".container tbody");
let rowTemplate = (rows) =>
    html`${rows.map(
        (data) => html`
            <tr>
                <td>${data.firstName} ${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.course}</td>
            </tr>
        `
    )} `;

const loadTable = async () => {
    let res = await fetch(url);
    let rowsObj = await res.json();
    let rows = Object.values(rowsObj);

    render(rowTemplate(rows), rowContainer);
};

loadTable();

function solve() {
    document.querySelector("#searchBtn").addEventListener("click", onClick);

    function onClick() {
        let searchField = document.querySelector("#searchField");
        let searchText = searchField.value;

        let rows = Array.from(rowContainer.querySelectorAll("tr"));

        rows.forEach((element) => {
            if (
                element.textContent
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            ) {
                element.classList.add("select");
            } else {
                element.classList.remove("select");
            }
        });

        searchField.value = null;
    }
}

solve();
