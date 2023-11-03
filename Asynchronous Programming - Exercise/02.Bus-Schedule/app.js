function solve() {
    let currentStopId = "depot";
    let nextStop = "";
    let infoBox = document.querySelector("span.info");
    let departButton = document.querySelector("#depart");
    let arriveButton = document.querySelector("#arrive");

    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${currentStopId}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                nextStop = data.name;
                currentStopId = data.next;
                infoBox.textContent = `Next stop ${nextStop}`;
                departButton.disabled = true;
                arriveButton.disabled = false;
            })
            .catch(() => {
                infoBox.textContent = "Error";
                departButton.disabled = true;
                arriveButton.disabled = true;
            });
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${nextStop}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
