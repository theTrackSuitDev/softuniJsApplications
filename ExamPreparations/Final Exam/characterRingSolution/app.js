import { page, render } from "./utils.js";
import { homeView } from "./views/home.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { editView } from "./views/edit.js"; 
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { catalogView } from "./views/catalog.js";
import { searchView } from "./views/search.js";
import { logoutReq } from "./auth.js";


function decorateContext(ctx, next) {
    ctx.render = function (contentTemplate) {
       render(contentTemplate, document.querySelector('main'));
    };

    next();
}

page(decorateContext);

page("/", homeView);
page("/catalog", catalogView);
page("/details/:id", detailsView);
page("/create", createView);
page("/edit/:id", editView);
page("/login", loginView);
page("/register", registerView);
// page("/search", searchView);

page.start();

const logoutButton = document.querySelector("#logoutBtn");
logoutButton.addEventListener("click", logout);

function logout() {
    logoutReq();
    page.redirect('/');
}