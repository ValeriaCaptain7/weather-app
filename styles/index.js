let celsiusTemperature = null;

// Search city weather
function search(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

// Show weather info
function showWeather(response) {
    let h1 = document.querySelector("h1");
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.main.temp);
    celsiusTemperature = response.data.main.temp;

    h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
    temperatureElement.innerHTML = temperature;

    document.querySelector("#visibility").innerHTML = response.data.visibility;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    
    getForecast(response.data.coord);
}

// Fetch weather forecast
function getForecast(coordinates) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

// Display the forecast
function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast .row");
    let forecastHTML = `<div class="row">`;
    
    response.data.daily.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML += `
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                        <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                    </div>
                </div>`;
        }
    });

    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

// Handle Celsius/Fahrenheit conversion
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Get current location weather
function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

// Event listeners
let form = document.querySelector("#search-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
});

let localizeButton = document.querySelector("#showPosition");
localizeButton.addEventListener("click", function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Initial search
search("Berlin");
