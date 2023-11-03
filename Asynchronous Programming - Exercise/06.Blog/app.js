function attachEvents() {
    let loadButton = document.querySelector("#btnLoadPosts");
    let postsMenu = document.querySelector("#posts");
    let viewButton = document.querySelector("#btnViewPost");
    let postTitle = document.querySelector("#post-title");
    let postBody = document.querySelector('#post-body');
    let commentsList = document.querySelector("#post-comments");

    loadButton.addEventListener("click", loadPosts);
    viewButton.addEventListener("click", viewPost);

    let postObj = {};

    function loadPosts() {
        let postsUrl = "http://localhost:3030/jsonstore/blog/posts";

        fetch(postsUrl)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.status);
                }
            })
            .then((data) => {
                for (const key in data) {
                    let body = data[key].body;
                    let id = data[key].id;
                    let title = data[key].title;

                    if (!postObj[id]) {
                        let newOption = document.createElement('option');
                        newOption.value = id;
                        newOption.textContent = title.toUpperCase();
                        postsMenu.appendChild(newOption);
    
                        postObj[id] = {
                            title,
                            body
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function viewPost() {
        let idToView = postsMenu.querySelector('option:checked').value;
        postTitle.textContent = postObj[idToView].title;
        postBody.textContent = postObj[idToView].body;

        let commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
        fetch(commentsUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((commentsData) => {
            commentsList.innerHTML = "";
            for (const key in commentsData) {
                if (commentsData[key].postId === idToView) {
                    let newListItem = document.createElement("li");
                    newListItem.textContent = commentsData[key].text;
                    commentsList.appendChild(newListItem);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

attachEvents();