import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { getById, editById } from "../endRequests.js";

const editTemplate = (item, ctx) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${editHandler.bind({}, ctx)}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value="${item.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                value="${item.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                value="${item.category}"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${item.description}</textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                value="${item.price}"
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

async function editHandler(ctx, event) {
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