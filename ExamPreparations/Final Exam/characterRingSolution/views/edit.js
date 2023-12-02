import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { getById, editById } from "../endRequests.js";

const editTemplate = (item, ctx) => html`
        <section id="edit">
          <div class="form">
            <img class="border" src="../images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${editHandler.bind({}, ctx)}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              value=${item.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${item.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >${item.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
          >${item.moreInfo}</textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="../images/border.png" alt="">
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