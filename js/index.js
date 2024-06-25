const apiKey = "0f48261330b043f2b3373825242406";
const city = document.getElementById("city");
const currentTemp = document.getElementById("currentTemp");
const currentCondition = document.getElementById("currentCondition");
const currentIcon = document.getElementById("currentIcon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirc = document.getElementById("windDirc");
const currDay = document.getElementById("currDay");
const currDate = document.getElementById("currDate");
const tmrw = document.getElementById("tmrw");
const dayAfter = document.getElementById("dayAfter");

const tempHighTmrw = document.getElementById("temp-high-tmrw");
const tempLowTmrw = document.getElementById("temp-low-tmrw");
const tmrwIcon = document.getElementById("tmrwIcon");
const tmrwCondition = document.getElementById("tmrw-condition");

const tempHighAfter = document.getElementById("temp-high-after");
const tempLowAfter = document.getElementById("temp-low-after");
const afterCondition = document.getElementById("after-condition");
const afterIcon = document.getElementById("afterIcon");

const searchBtn = document.getElementById("search-btn");
const searchCity = document.getElementById("city-search");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

searchBtn.addEventListener("click", () => checkWeather(searchCity.value));

searchCity.addEventListener("keyup", () => checkWeather(searchCity.value));

async function checkWeather(cityName) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=yes`
  );
  var data = await response.json();

  // TODAY
  let currdate = new Date(data.location.localtime);
  let day = currdate.getDay();
  let month = currdate.getMonth();

  currDay.innerHTML = days[day];
  currDate.innerHTML = currdate.getDate() + ` ${months[month]}`;

  city.innerHTML = data.location.name;
  currentTemp.innerHTML = data.current.temp_c + "°C";
  currentCondition.innerHTML = data.current.condition.text;
  currentIcon.setAttribute("src", `https:${data.current.condition.icon}`);

  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  if (data.current.wind_dir == "N") {
    windDirc.innerHTML = "north";
  } else if (data.current.wind_dir == "W") {
    windDirc.innerHTML = "west";
  } else if (data.current.wind_dir == "S") {
    windDirc.innerHTML = "south";
  } else if (data.current.wind_dir == "E") {
    windDirc.innerHTML = "east";
  }

  // Tmrw

  tmrw.innerHTML = days[day + 1];

  tempHighTmrw.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "°C";
  tempLowTmrw.innerHTML = data.forecast.forecastday[1].day.mintemp_c + "°C";

  tmrwIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[1].day.condition.icon}`
  );

  tmrwCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;

  // Day After

  dayAfter.innerHTML = days[day + 2];

  tempHighAfter.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + "°C";
  tempLowAfter.innerHTML = data.forecast.forecastday[2].day.mintemp_c + "°C";
  afterIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[2].day.condition.icon}`
  );

  afterCondition.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

navigator.geolocation.getCurrentPosition(success);

function success(position) {
  const long = position.coords.longitude;
  const lat = position.coords.latitude;

  getCityName(long, lat);
}

async function getCityName(long, lat) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=3&aqi=yes`
  );
  var data = await response.json();
  checkWeather(data.location.name);
}
