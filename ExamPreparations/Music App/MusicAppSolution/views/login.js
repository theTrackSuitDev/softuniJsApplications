import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { loginReq } from "../auth.js";

const loginTemplate = (ctx) => html`
        <section id="loginPage">
            <form @submit=${loginHandler.bind({}, ctx)}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
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
    setActiveNav();
    render(loginTemplate(ctx), htmlContainer);
}
