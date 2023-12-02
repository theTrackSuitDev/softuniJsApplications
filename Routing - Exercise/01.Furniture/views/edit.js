import { html, render, setActiveNav, navIds, htmlContainer } from "../utils.js";
import { getById, editById } from "../endRequests.js";

const editTemplate = (item, ctx) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${editHandler.bind({}, ctx)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value="${item.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" value="${item.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" value="${item.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value="${item.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${item.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${item.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`;

async function editHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let make = formData.get("make");
    let model = formData.get("model");
    let year = formData.get("year");
    let description = formData.get("description");
    let price = formData.get("price");
    let img = formData.get("img");
    let material = formData.get("material");

    let isValid = true;

    if (make.length < 4 || model.length < 4) {
        isValid = false;
        alert("Make and Model must be at least 4 symbols long!");
    }

    if (year < 1950 || year > 2050) {
        isValid = false;
        alert("Year must be between 1950 and 2050!");
    }

    if (description.length < 11) {
        isValid = false;
        alert("Description must be more than 10 symbols!");
    }

    if (price <= 0) {
        isValid = false;
        alert("Price must be a positive number!");
    }

    if (img === "") {
        isValid = false;
        alert("Image URL is required!");
    }

    if (!isValid) {
        return;
    }

    let newData = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
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
    setActiveNav(navIds.profile);

    let itemId = ctx.params.id;
    let item = await getById(itemId);
    
    render(editTemplate(item, ctx), htmlContainer);
}