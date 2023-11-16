import { addTopicCards } from "./utils.js";

let titleField = document.querySelector("#topicName");
let usernameField = document.querySelector("#username");
let postField = document.querySelector("#postText");

export function cancelPost(event) {
    event.preventDefault();
    titleField.value = "";
    usernameField.value = "";
    postField.value = "";
}

export async function postTopic(event) {
    event.preventDefault();
    let url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    let title = titleField.value;
    let username = usernameField.value;
    let post = postField.value;
    let time = new Date().toJSON();

    if (title === "" || username === "" || post === "") {
        alert("All fields are required!");
        return;
    }

    let topicObject = {
        title,
        username,
        post,
        time
    };

    try {
        let postResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topicObject)
        });

        if (postResponse.status != "200") {
            throw new Error("Bad server response");
        }

        let postData = await postResponse.json();
    } catch (error) {
        alert(error);
    }

    titleField.value = "";
    usernameField.value = "";
    postField.value = "";

    addTopicCards();
    alert("Topic created!")
}
