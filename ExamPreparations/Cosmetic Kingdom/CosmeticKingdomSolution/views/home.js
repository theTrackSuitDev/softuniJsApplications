import { html, render, setActiveNav, htmlContainer } from "../utils.js";

export async function homeView() {
    setActiveNav();
  
    let homeTemplate = () => html`
        <section id="home">
          <img src="../images/beauty-g0d19af267_1920-removebg.png" alt="home" />
          <h2>Looking for the best beauty products?</h2>
          <h3>You are in the right place!</h3>
        </section>
    `;

    render(homeTemplate(), htmlContainer);
}