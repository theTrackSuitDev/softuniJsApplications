import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { create } from "../endRequests.js";

const createTemplate = (ctx) => html`
        <section id="create">
          <div class="form">
            <img class="border" src="../images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${createHandler.bind({}, ctx)}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="../images/border.png" alt="">
          </div>
        </section>
`;

async function createHandler(ctx, event) {
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
        await create(newData);
        alert("Item created!");
        ctx.page.redirect(`/catalog`);
    } catch (error) {
        console.log(err.message);
    }
}

export function createView(ctx) {
    setActiveNav();
   
    render(createTemplate(ctx), htmlContainer);
}