function loadCommits() {
    let username = document.querySelector("#username").value;
    let repo = document.querySelector("#repo").value;
    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    let ulElement = document.querySelector("#commits");
    ulElement.innerHTML = "";

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                let errorLi = document.createElement("li");
                errorLi.textContent = `Error: ${response.status} (Not Found)`;
                ulElement.appendChild(errorLi);
                throw new Error (response.status);
            }
        })
        .then((data) => {
            data.forEach((entry) => {
            let newCommitLi = document.createElement("li");
            newCommitLi.textContent = `${entry.commit.author.name}: ${entry.commit.message}`;
            ulElement.appendChild(newCommitLi);
            });
        })
        .catch((error) => {
            console.log(`An error occurred!\n${error}`);
        });

        // Async/await solution:
    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     if (response.ok) {
    //         data.forEach((entry) => {
    //             let newCommitLi = document.createElement("li");
    //             newCommitLi.textContent = `${entry.commit.author.name}: ${entry.commit.message}`;
    //             ulElement.appendChild(newCommitLi);
    //         });
    //     } else {
    //         let errorLi = document.createElement("li");
    //         errorLi.textContent = `Error: ${response.status} (Not Found)`;
    //         ulElement.appendChild(errorLi);
    //     }
    // } catch (error) {
    //     console.log(`Error!\n${error}`);
    // }
}