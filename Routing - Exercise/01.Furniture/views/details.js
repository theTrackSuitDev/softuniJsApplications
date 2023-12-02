import {
    html,
    render,
    nothing,
    setActiveNav,
    navIds,
    htmlContainer,
} from "../utils.js";
import { getById, deleteById } from "../endRequests.js";

const itemTemplate = (item, isAuthor, onDelete) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${item.img}/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isAuthor ? html`<div>
                    <a href=${'/edit/${item._id}'} class="btn btn-info">Edit</a>
                    <a @click=${onDelete} href=”javascript:void(0)” class="btn btn-red">Delete</a>
                </div>`: null}
                
            </div>
        </div>`;

let context;
export async function detailsView(ctx) {
    setActiveNav(navIds.details);

    context = ctx;
    const user = sessionStorage.getItem("email");

    let itemId = ctx.params.id;
    let item = await getById(itemId);
    const isAuthor = item._ownerId === sessionStorage.getItem("_id");

    ctx.render(itemTemplate(item, isAuthor, (e) => { onDelete(e, itemId) }));
}

async function onDelete(e, id) {
    e.preventDefault();

    confirm('Are you sure you want to delete this item?');
    if (confirm) {
        await deleteById(id);
        context.page.redirect('/');
    }
}
