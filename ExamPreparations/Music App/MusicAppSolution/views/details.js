import {
    html,
    render,
    nothing,
    setActiveNav,
    navIds,
    htmlContainer,
} from "../utils.js";
import { getById, deleteById } from "../endRequests.js";

const itemTemplate = (item, isAuthor, deleteItem) => html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="..${item.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${item.name}</h1>
                        <h3>Artist: ${item.artist}</h3>
                        <h4>Genre: ${item.genre}</h4>
                        <h4>Price: $${item.price}</h4>
                        <h4>Date: ${item.releaseDate}</h4>
                        <p>Description: ${item.description}</p>
                    </div>

                    ${isAuthor ? html`
                    <div class="actionBtn">
                        <a href="/edit/${item._id}" class="edit">Edit</a>
                        <a href="javascript:void(0)" class="remove" @click=${deleteItem}}>Delete</a>
                    </div>`: nothing}

                </div>
            </div>
        </section>
`;

let context;
export async function detailsView(ctx) {
    setActiveNav();

    context = ctx;
    let itemId = ctx.params.id;
    let item = await getById(itemId);
    const isAuthor = item._ownerId === sessionStorage.getItem("_id");

    ctx.render(itemTemplate(item, isAuthor, (event) => { deleteItem(event, itemId) }));
}

async function deleteItem(event, id) {
    event.preventDefault();

    if (confirm("Are you sure you want to delete the current item?")) {
    } else {
        return;
    }
    
    await deleteById(id);
    context.page.redirect('/catalog');
    
}
