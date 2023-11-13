import {showMonths} from "./showFunctions.js";

hideAll();
showYears();

function hideAll() {
    let allSections = Array.from(document.querySelectorAll("section"));

    allSections.forEach(element => {
        element.style.display = 'none';
    });    
}

function showYears() {
    let years = document.querySelector('#years');
    years.style.display = "";
    attachEvents(years);
}

function attachEvents(parentSection) {
    let eventTargetsArray = Array.from(parentSection.querySelectorAll(`.day`));
    eventTargetsArray.forEach(element => {
        element.addEventListener("click", showNextLevel)
    });
}

function showNextLevel(event) {
    //hideAll();
    let currentLevel = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id;
    let currentData = event.currentTarget.querySelector(".date").textContent;

    showMonths(currentData);

    // switch (currentLevel) {
    //     case "years":
    //         showMonths
    //         break;
    
    //     default:
    //         break;
    // }
    
}

