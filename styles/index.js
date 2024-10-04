let celsiusTemperature = null;

// Function to display Fahrenheit temperature
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// Function to display Celsius temperature
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Function to show weather information
function showWeather(response) {
  let h1 = document.querySelector("h1");
  celsiusTemperature = response.data.main.temp;  // Update celsiusTemperature
  let temperature = Math.round(celsiusTemperature);
  h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
}

// Function to search weather by city name
function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

// Function to retrieve weather based on current location
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

// Use geolocation to get user's current position and weather
navigator.geolocation.getCurrentPosition(retrievePosition);

// Event listener for form submission (searching a city)
let form = document.querySelector("#search-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
});

// Event listeners for Fahrenheit and Celsius links
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Initial city search (for demonstration)
search("Rome");
search("Berlin");
