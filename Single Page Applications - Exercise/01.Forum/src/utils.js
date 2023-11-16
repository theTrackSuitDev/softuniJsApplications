import { showTopic } from "./topicView.js";

export async function addTopicCards() {
    let topicCardsContainer = document.querySelector('div.topic-title');
    topicCardsContainer.innerHTML = "";

    let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    try {
        let topicsResponse = await fetch(url);
        if (topicsResponse.status != "200") {
            throw new Error("Bad server response");
        }
        
        let topics = await topicsResponse.json();

        for (const topic in topics) {
            let topicData = topics[topic];
            let newTopic = createElement("div", "", ["class", "topic-container", "id", `${topicData._id}`]);
            let topicHtmlTemplate = `                
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <a href="#" class="normal" data-topic-id="${topicData._id}">
                            <h2>${topicData.title}</h2>
                        </a>
                        <div class="columns">
                            <div>
                                <p>Date: <time>${topicData.time}</time></p>
                                <div class="nick-name">
                                    <p>Username: <span>${topicData.username}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            // TO DO: Add escape function to prevent XSS attacks!
            newTopic.innerHTML = topicHtmlTemplate;
            topicCardsContainer.appendChild(newTopic);

            if (newTopic) {
                newTopic.querySelector("a").addEventListener("click", showTopic);
            }
        }

    } catch (error) {
        alert(error)
    }
}

export function createElement(type, content, attributes = []) {
    const element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (attributes.length > 0) {
        for (let i = 0; i < attributes.length; i += 2) {
            element.setAttribute(attributes[i], attributes[i + 1]);
        }
    }

    return element;
}

export function showHome(event) {
    event.preventDefault();
    let homeDiv = document.querySelector("div.container main");
    if (homeDiv.style.display === "none") {
        homeDiv.style.display = "";
        let topicContainer = document.querySelector("div.container .theme-content");
        topicContainer.remove();
        addTopicCards();
    }
}
