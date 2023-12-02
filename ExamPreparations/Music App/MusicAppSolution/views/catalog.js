import { html, render, setActiveNav, nothing, htmlContainer } from "../utils.js";
import { getAll } from "../endRequests.js";

export async function catalogView() {
    setActiveNav();

    let items = await getAll();

if (items.length > 0) {
        let catalogTemplate = (items) => html`
            <section id="catalogPage">
                <h1>All Albums</h1>

                ${items.map(item => html`
                <div class="card-box">
                    <img src=".${item.imgUrl}" />
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${item.name}</p>
                            <p class="artist">Artist: ${item.artist}</p>
                            <p class="genre">Genre: ${item.genre}</p>
                            <p class="price">Price: $${item.price}</p>
                            <p class="date">Release Date: ${item.releaseDate}</p>
                        </div>
                        <div class="btn-group">
                        ${sessionStorage.accessToken ? html`
                            <a href="/details/${item._id}" id="details">Details</a>
                        `: nothing}
                        </div>
                    </div>
                </div>
                `)}    
            </section>
        `;

        render(catalogTemplate(items), htmlContainer);
} else {
    let noItemsTemplate = (items) => html`
        <section id="catalogPage">
            <h1>All Albums</h1>
            
            <p>No Albums in Catalog!</p>
        </section>
    `;

    render(noItemsTemplate(items), htmlContainer);
}

}