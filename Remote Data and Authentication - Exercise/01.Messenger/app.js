function attachEvents() {
    let textArea = document.querySelector("#messages");
    textArea.value = "";
    let nameElement = document.querySelector("input[name='author']");
    let messageElement = document.querySelector("input[name='content']");
    let sendButton = document.querySelector("#submit");
    let refreshButton = document.querySelector("#refresh");
    let url = "http://localhost:3030/jsonstore/messenger";
    
    sendButton.addEventListener("click", sendMessage);
    async function sendMessage() {
        let messageData = {
            author: nameElement.value,
            content: messageElement.value,
        };

        if (messageData.author === "" || messageData.content === "") {
            alert("Name and Message fields are required");
        } else {
            await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(messageData),
            });
            
            messageElement.value = "";
            refresh();
        }
    }

    refreshButton.addEventListener("click", refresh);
    async function refresh() {
        try {
            let res = await fetch(url);
            let data = await res.json();
            if (res.status != "200") {
                throw new Error(`Error: ${res.status}`);
            }

            textArea.value = "";
            for (const comment in data) {
                let name = data[comment].author;
                let message = data[comment].content;
                let result = `${name}: ${message}\n`;
                textArea.value += result;
            }

            textArea.value = textArea.value.trim();

        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();