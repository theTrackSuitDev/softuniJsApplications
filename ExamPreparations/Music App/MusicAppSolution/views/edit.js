import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { getById, editById } from "../endRequests.js";

const editTemplate = (item, ctx) => html`
        <section class="editPage">
            <form @submit=${editHandler.bind({}, ctx)}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${item.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${item.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${item.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${item.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${item.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${item.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${item.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;

async function editHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let name = formData.get("name");
    let imgUrl = formData.get("imgUrl");
    let price = formData.get("price");
    let releaseDate = formData.get("releaseDate");
    let artist = formData.get("artist");
    let genre = formData.get("genre");
    let description = formData.get("description");

    if (
            name === "" ||
            imgUrl === "" ||
            price === "" ||
            releaseDate === "" ||
            artist === "" ||
            genre === "" ||
            description === ""
    ) {
        alert("All fields are required!");
        return;
    }

    let newData = {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
    }

    try {
        let itemId = ctx.params.id;
        await editById(itemId, newData);
        alert("Item updated!");
        ctx.page.redirect(`/details/${itemId}`);
    } catch (error) {
        console.log(err.message);
    }
}

export async function editView(ctx) {
    setActiveNav();

    let itemId = ctx.params.id;
    let item = await getById(itemId);
    
    render(editTemplate(item, ctx), htmlContainer);
}