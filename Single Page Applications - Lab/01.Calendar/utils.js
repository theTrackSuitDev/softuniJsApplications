export function hideAll() {
    let allSections = Array.from(document.querySelectorAll("section"));

    allSections.forEach((element) => {
        element.style.display = "none";
    });
}

export let monthsDictionary = {
Jan: '1',
Feb: '2',
Mar: '3',
Apr: '4',
May: '5',
Jun: '6',
Jul: '7',
Aug: '8',
Sept: '9',
Oct: '10',
Nov: '11',
Dec: '12'
}