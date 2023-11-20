import { contacts } from "./contacts.js";
import { html, render } from "../../node_modules/lit-html/lit-html.js";

const contactsContainer = document.querySelector('#contacts');

let contactsTemplate = (contacts) => html `${contacts.map((entry) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${entry.name}</h2>
            <button class="detailsBtn" @click=${showDetails}>Details</button>
            <div class="details" id="${entry.id}">
                <p>Phone number: ${entry.phoneNumber}</p>
                <p>Email: ${entry.email}</p>
            </div>
        </div>
    </div>
`)}`;

function showDetails(event) {
    const infoDiv = event.target.parentNode;
    const details = infoDiv.querySelector('.details');
    if (details.style.display === "inline-block") {
        details.style.display = "none";
    } else {
        details.style.display = "inline-block";
    }
}

render(contactsTemplate(contacts), contactsContainer);
