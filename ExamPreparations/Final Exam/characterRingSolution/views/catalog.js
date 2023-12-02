import { html, render, setActiveNav, nothing, htmlContainer } from "../utils.js";
import { getAll } from "../endRequests.js";

export async function catalogView() {
    setActiveNav();

    let items = await getAll();

if (items.length > 0) {
        let catalogTemplate = (items) => html`
            <h2>Characters</h2>
            <section id="characters">
                ${items.map(item => html`
                <div class="character">
                    <img src="..${item.imageUrl}" alt="example1" />
                    <div class="hero-info">
                        <h3 class="category">${item.category}</h3>
                        <p class="description">${item.description}</p>
                        <a class="details-btn" href="/details/${item._id}">More Info</a>
                    </div>
                </div>
                `)}
            </section>
        `;

        render(catalogTemplate(items), htmlContainer);
} else {
    let noItemsTemplate = () => html`
        <h2>Characters</h2>

        <h2>No added Heroes yet.</h2>
    `;

    render(noItemsTemplate(items), htmlContainer);
}

}