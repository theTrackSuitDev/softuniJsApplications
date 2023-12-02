import { html, render, setActiveNav, navIds, htmlContainer } from "../utils.js";
import { registerReq } from "../auth.js";

const registerTemplate = (ctx) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${registerHandler.bind({}, ctx)}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

async function registerHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("rePass");

    if (email === "" || password === "" || rePass === "") {
        alert("All fields are required!");
        return;
    }

    if (password !== rePass) {
        alert("Password does not match!");
        return;
    }

    try {
        await registerReq(email, password);
        alert("Successfully registered!");
        ctx.page.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
}

export function registerView(ctx) {   
    setActiveNav(navIds.register);
    render(registerTemplate(ctx), htmlContainer);    
}