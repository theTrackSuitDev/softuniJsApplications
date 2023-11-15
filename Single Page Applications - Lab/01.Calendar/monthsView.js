import { hideAll } from "./utils.js";
import { showYears } from "./yearsView.js";
import { showDays } from "./daysView.js";

export function showMonths(event) {
    hideAll();
    let yearName = event.currentTarget.querySelector(".date").textContent;
    let yearSelector = `#year-${yearName}`;
    let yearElement = document.querySelector(yearSelector);
    yearElement.style.display = "";

    let monthTargetsArray = Array.from(yearElement.querySelectorAll(`.day`));
    monthTargetsArray.forEach((element) => {
        element.addEventListener("click", showDays);
    });

    let yearCaption = yearElement.querySelector('caption');
    yearCaption.addEventListener("click", showYears);
}