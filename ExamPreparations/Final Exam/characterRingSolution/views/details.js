import {
    html,
    render,
    nothing,
    setActiveNav,
    navIds,
    htmlContainer,
} from "../utils.js";
import { getById, deleteById, getLikes, sendLike, getLikesByUser } from "../endRequests.js";

const itemTemplate = (item, isAuthor, likesObj, isLikedByUser, likeItem, deleteItem) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="..${item.imageUrl}" alt="example1" />
            <div>
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                   <p id ="more-info">${item.moreInfo}</p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">${likesObj.count}</span></h3>

                <!--Edit and Delete are only for creator-->
                    <div id="action-buttons">
                        ${isAuthor ? html`
                        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                        <a href="javascript:void(0)" id="delete-btn" @click=${deleteItem}>Delete</a>
                        ` : nothing           
                        }
                        ${!isAuthor && sessionStorage.accessToken && !isLikedByUser ? html`
                        <a href="javascript:void(0)" id="like-btn" @click=${likeItem}>Like</a>
                        ` : nothing 
                        } 
                    </div>
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
    let userId = sessionStorage.getItem("_id");
    const isAuthor = item._ownerId === userId;

    let isLikedByUser = await getLikesByUser(userId, itemId);

    if (isLikedByUser > 0) {
        isLikedByUser = true;
    } else {
        isLikedByUser = false;
    }

    let likesObj = {
        count: await getLikes(itemId)
    }

    ctx.render(itemTemplate(item, isAuthor, likesObj, isLikedByUser, (event) => { likeItem(event, itemId) }, (event) => { deleteItem(event, itemId) }));
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

async function likeItem(event, itemId) {
    event.preventDefault();

    let likeItem = {
        characterId: itemId
    }

    await sendLike(likeItem);
    context.page.redirect(`/details/${itemId}`);
}