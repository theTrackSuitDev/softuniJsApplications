import { html, render, setActiveNav, navIds, htmlContainer } from "../utils.js";
import { create } from "../endRequests.js";

const createTemplate = (ctx) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${createHandler.bind({}, ctx)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`;

async function createHandler(ctx, event) {
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
        await create(newData);
        alert("Item created!");
        ctx.page.redirect(`/`);
    } catch (error) {
        console.log(err.message);
    }
}

export function createView(ctx) {
    setActiveNav(navIds.create);
   
    render(createTemplate(ctx), htmlContainer);
}