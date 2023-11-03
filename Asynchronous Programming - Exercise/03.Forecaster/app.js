function attachEvents() {
    let submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', getWeather);

    let symbolsObject = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "\u00B0"
    }

    function getWeather() {
        let location = document.querySelector('#location').value;
        let locationsArray =[];
        let locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';

        fetch(locationsUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Bad response from server");
                }
            })
            .then((data) => {
                locationsArray = data;
                let locationIndex = locationsArray.findIndex(el => el.name === location);
                if (locationIndex === -1) {
                    throw new Error("Invalid location");
                }

                let locationCode = locationsArray[locationIndex].code;

                let todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
                let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

                fetch(todayUrl)
                    .then((todayResponse) => {
                        if (todayResponse.ok) {
                            return todayResponse.json();
                        } else {
                            throw new Error("Current conditions unavailable");
                        }
                    })
                    .then((todayData) => {
                        let todayLow = todayData.forecast.low;
                        let todayHigh = todayData.forecast.high;
                        let todayCondition = todayData.forecast.condition;

                        let todayDiv = document.querySelector("#forecast");
                        todayDiv.style.display = "block";

                        let currentDiv = document.querySelector("#current");

                        let todayForecastDiv = document.createElement("div");
                        todayForecastDiv.classList.add("forecasts");
                        currentDiv.appendChild(todayForecastDiv);

                        let symbolSpan = document.createElement("span");
                        symbolSpan.classList.add("condition", "symbol");
                        symbolSpan.innerHTML = symbolsObject[todayCondition];
                        todayForecastDiv.appendChild(symbolSpan);

                        let conditionSpan = document.createElement("span");
                        conditionSpan.classList.add("condition");
                        todayForecastDiv.appendChild(conditionSpan);

                        let locationSpan = document.createElement("span");
                        locationSpan.classList.add("forecast-data");
                        locationSpan.textContent = todayData.name;
                        conditionSpan.appendChild(locationSpan);

                        let tempSpan = document.createElement("span");
                        tempSpan.classList.add("forecast-data");
                        tempSpan.textContent = `${todayLow}${symbolsObject["Degrees"]}/${todayHigh}${symbolsObject["Degrees"]}`;
                        conditionSpan.appendChild(tempSpan);

                        let weatherSpan = document.createElement("span");
                        weatherSpan.classList.add("forecast-data");
                        weatherSpan.textContent = todayCondition;
                        conditionSpan.appendChild(weatherSpan);
                    })
                    .catch((err) => {
                        console.log(err);;
                    });

                fetch(upcomingUrl)
                    .then((upResponse) => {
                        if (upResponse.ok) {
                            return upResponse.json();
                        } else {
                            throw new Error("Upcoming conditions unavailable");
                        }
                    })
                    .then((upData) => {
                        let upDiv = document.querySelector('#upcoming');

                        let upInfoDiv = document.createElement("div");
                        upInfoDiv.classList.add("forecast-info");
                        upDiv.appendChild(upInfoDiv);

                        upData.forecast.forEach(day => {
                            let low = day.low;
                            let high = day.high;
                            let condition = day.condition;

                            let upSpan = document.createElement("span");
                            upSpan.classList.add("upcoming");
                            upInfoDiv.appendChild(upSpan);

                            let symbolSpan = document.createElement("span");
                            symbolSpan.classList.add("symbol");
                            symbolSpan.innerHTML = symbolsObject[condition];
                            upSpan.appendChild(symbolSpan);

                            let upTempSpan = document.createElement("span");
                            upTempSpan.classList.add("forecast-data");
                            upTempSpan.textContent = `${low}${symbolsObject["Degrees"]}/${high}${symbolsObject["Degrees"]}`;
                            upSpan.appendChild(upTempSpan);

                            let upCondSpan = document.createElement("span");
                            upCondSpan.classList.add("forecast-data");
                            upCondSpan.textContent = condition;
                            upSpan.appendChild(upCondSpan);
                        });
                    })
                    .catch((err) => {
                        console.log(err);;
                    });
            })
            .catch(() => {
                document.querySelector("#forecast").textContent = "Error";
            });
    }
}

attachEvents();