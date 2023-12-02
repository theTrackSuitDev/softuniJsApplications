import { html, render, nothing } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";

function setActiveNav(currentId) {
    // const anchors = Array.from(document.querySelectorAll("nav li"));
    // anchors.forEach(element => {
    //     element.classList.remove("active");
    // });

    // const currentSection = document.querySelector(`#${currentId}`);
    // currentSection.classList.add("active");

    let userNav = document.querySelectorAll(".user");
    let guestNav = document.querySelectorAll(".guest");

    if (sessionStorage.accessToken) {
        userNav.forEach(element => {
            element.style.display = "";
        });
        guestNav.forEach(element => {
            element.style.display = "none";
        });
    } else {
        userNav.forEach(element => {
            element.style.display = "none";
        });
        guestNav.forEach(element => {
            element.style.display = "";
        });
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

const htmlContainer = document.querySelector("#main-content");

export {
    html,
    render,
    nothing,
    page,
    setActiveNav,
    navIds,
    htmlContainer
};