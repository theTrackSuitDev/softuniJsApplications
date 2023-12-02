import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { registerReq } from "../auth.js";

const registerTemplate = (ctx) => html`
<section id="registerPage">
            <form @submit=${registerHandler.bind({}, ctx)}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

async function registerHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("conf-pass");

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
    setActiveNav();
    render(registerTemplate(ctx), htmlContainer);    
}