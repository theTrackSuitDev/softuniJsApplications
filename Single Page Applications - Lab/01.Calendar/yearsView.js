import { showMonths } from "./monthsView.js";
import { hideAll } from "./utils.js";

export function showYears() {
    hideAll();
    let years = document.querySelector("#years");
    years.style.display = "";
    
    let yearTargetsArray = Array.from(years.querySelectorAll(`.day`));
    yearTargetsArray.forEach((element) => {
        element.addEventListener("click", showMonths);
    });
}