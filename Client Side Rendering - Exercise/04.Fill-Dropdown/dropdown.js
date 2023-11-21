import { html, render } from "../../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const menuElement = document.querySelector("#menu");
let template = (items) => html`
    ${items.map(
        (entry) => html` <option .value=${entry._id}>${entry.text}</option> `
    )}
`;

const loadItems = async () => {
    let res = await fetch(url);
    let data = await res.json();
    let entries = Object.values(data);
    render(template(entries), menuElement);
};
loadItems();

const inputElement = document.querySelector("#itemText");
inputElement.value = null;
const addBtn = document.querySelector("[value='Add']");
addBtn.addEventListener("click", addItem);

async function addItem(event) {
    event.preventDefault();
    let addValue = inputElement.value;
    if (!addValue) {
        alert("Input field is empty!");
        return;
    }

    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: addValue })
    });

    let data = await res.json();
    loadItems();
    inputElement.value = null;
}
