import { html, render, nothing } from "../../node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

function setActiveNav(currentId) {
    const anchors = Array.from(document.querySelectorAll("nav a"));
    anchors.forEach(element => {
        element.classList.remove("active");
    });

    const currentSection = document.querySelector(`#${currentId}`);
    currentSection.classList.add("active");

    let userNav = document.querySelector("#user");
    let guestNav = document.querySelector("#guest");

    if (sessionStorage.accessToken) {
        userNav.style.display = "";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "";
    }
}

const navIds = {
    home: "catalogLink",
    details: "catalogLink",
    create: "createLink",
    edit: "profileLink",
    login: "loginLink",
    register: "registerLink",
    profile: "profileLink"
}

const htmlContainer = document.querySelector("div.container");

export {
    html,
    render,
    nothing,
    page,
    setActiveNav,
    navIds,
    htmlContainer
};