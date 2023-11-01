function loadRepos() {
    const username = document.querySelector("#username").value;
    const baseUrl = "https://api.github.com/users/";

    fetch(`${baseUrl}${username}/repos`)
        .then((res) => res.json())
        .then((data) => {
            const listElement = document.querySelector("#repos");
            listElement.innerHTML = "";
            
            if (!data.message) {
                data.forEach((repo) => {
                    let newLiElement = document.createElement("li");
                    listElement.appendChild(newLiElement);
                    let newRepoLink = document.createElement("a");
                    newRepoLink.href = repo.html_url;
                    newRepoLink.textContent = repo.full_name;
                    newLiElement.appendChild(newRepoLink);
                });
            } else {
                let newLiElement = document.createElement("li");
                newLiElement.textContent = `${data.message}`;
                listElement.appendChild(newLiElement);
            }
        })
        .catch((err) => console.log(err));

        // Async/await solution:
    // try {
    //     const response = await fetch(`${baseUrl}${username}/repos`);
    //     const data = await response.json();
    //     const listElement = document.querySelector("#repos");
    //     listElement.innerHTML = "";
        
    //     if (response.ok) {
    //         data.forEach((repo) => {
    //             let newLiElement = document.createElement("li");
    //             listElement.appendChild(newLiElement);
    //             let newRepoLink = document.createElement("a");
    //             newRepoLink.href = repo.html_url;
    //             newRepoLink.textContent = repo.full_name;
    //             newLiElement.appendChild(newRepoLink);
    //         });
    //     } else {
    //         let newLiElement = document.createElement("li");
    //         newLiElement.textContent = `${response.status}: ${data.message}`;
    //         listElement.appendChild(newLiElement);
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}