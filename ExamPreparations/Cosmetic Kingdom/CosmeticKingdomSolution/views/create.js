import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { create } from "../endRequests.js";

const createTemplate = (ctx) => html`
        <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${createHandler.bind({}, ctx)}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

async function createHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let name = formData.get("name");
    let imageUrl = formData.get("imageUrl");
    let category = formData.get("category");
    let description = formData.get("description");
    let price = formData.get("price");

    if (
        name === "" ||
        imageUrl === "" ||
        category === "" ||
        description === "" ||
        price === ""
    ) {
        alert("All fields are required!");
        return;
    }

    let newData = {
        name,
        imageUrl,
        category,
        description,
        price
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