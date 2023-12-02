import { html, render, setActiveNav, htmlContainer } from "../utils.js";
import { loginReq } from "../auth.js";

const loginTemplate = (ctx) => html`
        <section id="login">
          <div class="form">
            <img class="border" src="../images/border.png" alt="">
            <h2>Login</h2>
            <form class="login-form" @submit=${loginHandler.bind({}, ctx)}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
            <img class="border" src="../images/border.png" alt="">
          </div>
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
