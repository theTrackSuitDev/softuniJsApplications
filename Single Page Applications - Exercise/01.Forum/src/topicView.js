import { createElement } from "./utils.js";

export async function showTopic(event) {
    event.preventDefault();
    let homeDiv = document.querySelector("div.container main");
    homeDiv.style.display = "none";
    let viewContainer = document.querySelector("div.container");

    let topicId = event.currentTarget.dataset.topicId;
    let topicsUrl = "http://localhost:3030/jsonstore/collections/myboard/posts";
    let topicsResponse = await fetch(topicsUrl);
    let topics = await topicsResponse.json();
    let topic = topics[topicId];

    let topicHtmlTemplate = `
        <div class="theme-title">
            <div class="theme-name-wrapper">
                <div class="theme-name">
                    <h2>${topic.title}</h2>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${topic.username}</span> posted on <time>${topic.time}</time></p>

                <p class="post-content">${topic.post}</p>
            </div>
        </div>

        <div class="answer-comment">
            <p><span>currentUser</span> comment:</p>
            <div class="answer">
                <form>
                    <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                    <div>
                        <label for="username">Username <span class="red">*</span></label>
                        <input type="text" name="username" id="username">
                    </div>
                    <button data-topic-id="${topicId}">Post</button>
                </form>
            </div>
        </div>`;
    // TO DO: Add escape function to prevent XSS attacks!
    let topicDiv = createElement("div", "", ["class", "theme-content"]);
    topicDiv.innerHTML = topicHtmlTemplate;
    viewContainer.appendChild(topicDiv);
    let commentBtn = document.querySelector("div.answer button");
    commentBtn.addEventListener("click", addComment);
    loadUserComments(topicId);
}

async function addComment(event) {
    event.preventDefault();
    let comment = document.querySelector("#comment").value;
    let username = document.querySelector(".answer #username").value;
    let time = new Date().toJSON();
    let topicId = event.currentTarget.dataset.topicId;

    if (comment === "" || username === "") {
        alert("All fields are required!");
        return;
    }

    let commentObject = {
        username,
        comment,
        topicId,
        time,
    };

    let postUrl =
        "http://localhost:3030/jsonstore/collections/myboard/comments";
    let postResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentObject),
    });

    let commentData = await postResponse.json();
    document.querySelector("#comment").value = "";
    document.querySelector(".answer #username").value = "";
    alert("Comment added!");
    loadUserComments(topicId);
}

async function loadUserComments(topicId) {
    let commentsParent = document.querySelector("div.comment");
    let originalPost = commentsParent
        .querySelector("div.header")
        .cloneNode(true);
    commentsParent.innerHTML = "";
    commentsParent.appendChild(originalPost);

    let url = "http://localhost:3030/jsonstore/collections/myboard/comments";
    let commentsResponse = await fetch(url);
    let comments = await commentsResponse.json();

    for (const commentEntry in comments) {
        let currentComment = comments[commentEntry];
        if (currentComment.topicId === topicId) {
            let commentTemplate = `
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p><strong>${currentComment.username}</strong> commented on <time>${currentComment.time}</time></p>
                        <div class="post-content">
                            <p>${currentComment.comment}</p>
                        </div>
                    </div>
                </div>`;

            let newComment = createElement("div", "", ["class", "user-comment"]);
            newComment.innerHTML = commentTemplate;
            commentsParent.appendChild(newComment);
        }
    }
}