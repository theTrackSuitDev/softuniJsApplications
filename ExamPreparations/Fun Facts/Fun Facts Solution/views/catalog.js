import { html, render, setActiveNav, nothing, htmlContainer } from "../utils.js";
import { getAll } from "../endRequests.js";

export async function catalogView() {
    setActiveNav();

    let items = await getAll();

if (items.length > 0) {
        let catalogTemplate = (items) => html`
            <h2>Fun Facts</h2>
            <section id="dashboard">
                ${items.map(item => html`
                <div class="fact">
                    <img src="..${item.imageUrl}" alt="example1" />
                    <h3 class="category">${item.category}</h3>
                    <p class="description">${item.description}</p>
                    <a class="details-btn" href="/details/${item._id}">More Info</a>
                </div>
                `)}
            </section>
        `;

        render(catalogTemplate(items), htmlContainer);
} else {
    let noItemsTemplate = () => html`
        <section id="catalogPage">
            <h2>Fun Facts</h2>
            
            <h2>No Fun Facts yet.</h2>
        </section>
    `;

    render(noItemsTemplate(items), htmlContainer);
}

}