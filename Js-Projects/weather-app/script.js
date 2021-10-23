// create your account on https://openweathermap.org/ and
// enter you api id
// let appId =
let units = "metric"; //metric,imperial
let searchMethod;

document.getElementById("searchBtn").addEventListener("click", function () {
  let searchTerm = document.getElementById("searchInput").value;
  if (!searchTerm) return;

  getSearchMethod(searchTerm);
  searchWeather(searchTerm);
});

function getSearchMethod(searchTerm) {
  if (isFinite(searchTerm)) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
}

function init(resultFromServer) {
  // console.log(resultFromServer);

  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("img/clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("img/cloud.jpg")';
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("img/rain.jpg")';
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("img/thunderstorm.jpg")';
      break;

    case "Snow":
      document.body.style.backgroundImage = 'url("img/snow.jpg")';
      break;

    default:
      document.body.style.backgroundImage = 'url("img/default.jpg")';
      break;
  }

  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");
  let hideAfterSearch = document.getElementById("hideAfterSearch");
  console.log(hideAfterSearch);

  hideAfterSearch.classList.add("hideAfterSearch");

  weatherIcon.src =
    " http://openweathermap.org/img/wn/" +
    resultFromServer.weather[0].icon +
    "@2x.png";

  let resultDescription = resultFromServer.weather[0].description;

  // weatherDescriptionHeader.innerText = resultDescription.split(' ').forEach(function(ele){
  //     return ele.slice(1,1).toUpperCase() + ele.slice(2);
  // });
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176";

  windSpeedElement.innerHTML = resultFromServer.wind.speed + " m/s";

  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";

  cityHeader.innerText = resultFromServer.name;

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;
  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

async function searchWeather(searchTerm) {
  try {
    const sea = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&${units}`
    );
    // const sea = await fetch('http://api.openweathermap.org/data/2.5/weather?q=london&appid=c0e4b3d9be14a150a117efe798421dfe&imperial')
    const data = await sea.json();
    // const data = await sea.text();
    if (!data) {
      throw new Error(err);
    }
    // console.log(data)
    init(data);
  } catch (err) {
    console.log(err);
  }
}

// setPositionForWeatherInfo();
