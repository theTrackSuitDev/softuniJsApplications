import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { getById, editById } from "../endRequests.js";

const editTemplate = (item, ctx) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${editHandler.bind({}, ctx)}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              value="${item.category}"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value="${item.imageUrl}"
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50">${item.description}</textarea>
            <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50">${item.moreInfo}</textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`;

async function editHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let category = formData.get("category");
    let imageUrl = formData.get("image-url");
    let description = formData.get("description");
    let moreInfo = formData.get("additional-info");

    if (
        category === "" ||
        imageUrl === "" ||
        description === "" ||
        moreInfo === ""
    ) {
        alert("All fields are required!");
        return;
    }

    let newData = {
        category,
        imageUrl,
        description,
        moreInfo
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