// Date Function

function getCurrentDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  let sentence = `${currentDay} ${currentHour}:${currentMinutes}`;

  let currentDate = document.querySelector("#current-day");
  currentDate.innerHTML = `${sentence}`;
}
getCurrentDay();

// Search Engine

function showTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#location");
  let temperature = document.querySelector("#temp");
  let windSpeed = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  humidityElement.innerHTML = response.data.main.humidity + "%";
}

function searchLocation(city) {
  let apiKey = "6944106f98547ab3f1415842da965c69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value;
  searchLocation(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

function currentLocation(position) {
  let apiKey = "6944106f98547ab3f1415842da965c69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentPosition);

searchLocation("Stockholm");
