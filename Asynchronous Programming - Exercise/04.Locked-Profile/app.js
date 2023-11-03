function lockedProfile() {
    let main = document.querySelector("#main");
    main.innerHTML = "";
    let profilesUrl = "http://localhost:3030/jsonstore/advanced/profiles";

    fetch(profilesUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((data) => {
            let index = 1;
            for (const key in data) {
                let username = data[key].username;
                let email = data[key].email;
                let age = data[key].age;

                let profileDiv = document.createElement("div");
                profileDiv.classList.add("profile");
                main.appendChild(profileDiv);

                let profileDivHtml = `<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${index}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${index}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${index}Username" value="${username}" disabled readonly />
				<div class="hiddenInfo">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${index}Email" value="${email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user${index}Age" value="${age}" disabled readonly />
                </div>
                <button>Show more</button>`;
                index++;

                profileDiv.innerHTML = profileDivHtml;
                let showMore = profileDiv.querySelector("button");
                showMore.style.cursor = "pointer";
                showMore.addEventListener("click", showHiddenInfo);
            }
        })
        .catch((err) => {
            console.log(err);
        });

    function showHiddenInfo(event) {
        let currentShowMore = event.currentTarget;
        let currentProfileDiv = currentShowMore.parentNode;
        let checkedRadio = currentProfileDiv.querySelector(
            "input[type='radio']:checked"
        );
        if (checkedRadio.value === "lock") {
            return;
        }

        let hiddenFields = Array.from(
            currentProfileDiv.querySelectorAll(
                ".hiddenInfo > input, hiddenInfo > label"
            )
        );

        if (currentShowMore.textContent === "Show more") {
            hiddenFields.forEach((element) => {
                element.style.display = "inline-block";
            });
        } else {
            hiddenFields.forEach((element) => {
                element.style.display = "none";
            });
        }

        if (currentShowMore.textContent === "Show more") {
            currentShowMore.textContent = "Hide it";
        } else {
            currentShowMore.textContent = "Show more";
        }
    }
}