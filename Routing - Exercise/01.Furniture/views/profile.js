import { html, render, setActiveNav, navIds, htmlContainer} from "../utils.js";
import { getByUserId } from "../endRequests.js";



export async function profileView() {   
    setActiveNav(navIds.profile);
    const userId = sessionStorage.getItem("_id");

    let items = await getByUserId(userId);
    
    let profileTemplate = (items) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(item => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${item.img}" />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="${`details/${item._id}`}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
            `)}
        </div>
    `;

    render(profileTemplate(items), htmlContainer);
}