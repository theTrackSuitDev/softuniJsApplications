import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { registerReq } from "../auth.js";

const registerTemplate = (ctx) => html`
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${registerHandler.bind({}, ctx)}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

async function registerHandler(ctx, event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("re-password");

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
        ctx.page.redirect("/catalog");
    } catch (err) {
        console.log(err.message);
    }
}

export function registerView(ctx) {   
    setActiveNav();
    render(registerTemplate(ctx), htmlContainer);    
}