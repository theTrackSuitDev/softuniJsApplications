import { monthsDictionary } from "./utils.js";
import { hideAll } from "./utils.js";

export function showDays(event) {
    hideAll();
    let monthName = event.currentTarget.querySelector(".date").textContent;
    let yearElement =
        event.currentTarget.parentElement.parentElement.parentElement
            .parentElement;
    let yearName = yearElement.id.split("-")[1];

    let monthSelector = `#month-${yearName}-${monthsDictionary[monthName]}`;
    let monthElement = document.querySelector(monthSelector);
    monthElement.style.display = "";

    let monthCaption = monthElement.querySelector("caption");
    monthCaption.addEventListener("click", () => {
        hideAll();
        yearElement.style.display = "";
    });
}
