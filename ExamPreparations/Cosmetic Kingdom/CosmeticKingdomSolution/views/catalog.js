import { html, render, setActiveNav, nothing, htmlContainer } from "../utils.js";
import { getAll } from "../endRequests.js";

export async function catalogView() {
    setActiveNav();

    let items = await getAll();

if (items.length > 0) {
        let catalogTemplate = (items) => html`
        <h2>Products</h2>
        <section id="dashboard">
            ${items.map(item => html`
            <div class="product">
            <img src="..${item.imageUrl}" alt="example1" />
            <p class="title">${item.name}</p>
            <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
          </div>
            `)}
        </section>
        `;

        render(catalogTemplate(items), htmlContainer);
} else {
    let noItemsTemplate = () => html`
        <section id="catalogPage">
            <h2>Products</h2>
            
            <h2>No products yet.</h2>
        </section>
    `;

    render(noItemsTemplate(items), htmlContainer);
}

}