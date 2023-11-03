function getInfo() {
    let stopId = document.querySelector("#stopId").value;
    let stopNameDiv = document.querySelector("#stopName");
    let busesListElement = document.querySelector("#buses");
    busesListElement.innerHTML = "";

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                stopNameDiv.textContent = "Error";
                throw new Error(response.status);
            }
        })
        .then((data) => {
            stopNameDiv.textContent = data.name;

            for (const busNumber in data.buses) {
                let busId = busNumber;
                let time = data.buses[busNumber];

                let newListItem = document.createElement("li");
                newListItem.textContent = `Bus ${busId} arrives in ${time} minutes`;
                busesListElement.appendChild(newListItem);
            }
        })
        .catch(() => {
            stopNameDiv.textContent = "Error";
        });
}
