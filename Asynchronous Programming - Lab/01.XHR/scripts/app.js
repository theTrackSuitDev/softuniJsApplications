function loadRepos() {
    let url = "https://api.github.com/users/testnakov/repos";
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4) {
            document.querySelector("#res").textContent = xmlHttpRequest.responseText;
        }
    });
    xmlHttpRequest.open("GET", url);
    xmlHttpRequest.send();
}