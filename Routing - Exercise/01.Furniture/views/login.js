import { html, render, setActiveNav, navIds, htmlContainer } from "../utils.js";
import { loginReq } from "../auth.js";

const loginTemplate = (ctx) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${loginHandler.bind({}, ctx)}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input
                        class="form-control"
                        id="email"
                        type="text"
                        name="email"
                    />
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password"
                        >Password</label
                    >
                    <input
                        class="form-control"
                        id="password"
                        type="password"
                        name="password"
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
`;

async function loginHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");

    if (email === "" || password === "") {
        alert("You should provide email and password!");
        return;
    }

    try {
        await loginReq(email, password);
        alert("Logged in");
        ctx.page.redirect("/");
    } catch (err) {
        console.log(err.message);
    }
}

export function loginView(ctx) {
    setActiveNav(navIds.login);
    render(loginTemplate(ctx), htmlContainer);
}
