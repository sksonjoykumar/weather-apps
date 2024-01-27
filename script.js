// Get all HTML Id
const condition = document.getElementById("condition");
const city = document.getElementById("city");
const country = document.getElementById("country");
const main = document.getElementById("main");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const cityInput = document.getElementById("cityInput");

// Open Weather API Data
const apiKey = `b7729543282cba4770dde336a9fce325`;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?${apiKey}`;
const iconUrl = "https://openweathermap.org/img/wn/";

const defaultCity = "Dhaka,BD";

window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      getWeatherData(null, success.coords);
    },
    (e) => {
      getWeatherData();
    }
  );
  cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      if (event.target.value) {
        getWeatherData(event.target.value);
        event.target.value = "";
      } else {
        alert("Please Enter a Valid City");
      }
    }
  });
};

function getWeatherData(city = defaultCity, coords) {
  let url = baseUrl;
  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`)
    : (url = `${url}&q=${city}&appid=${apiKey}`);

  axios
    .get(url)
    .then(({ data }) => {
      // console.log(data);
      let weather = {
        icon: data.weather[0].icon,
        name: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: `${(data.main.temp - 273.15).toFixed(0)}°C`,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };
      setWeather(weather);
    })
    .catch((err) => {
      // console.log(err.message);
      alert("City Not Found");
    });
}

function setWeather(weather) {
  condition.src = `${iconUrl}${weather.icon}.png`;
  city.innerHTML = weather.name;
  country.innerHTML = weather.country;
  main.innerHTML = weather.main;
  description.innerHTML = weather.description;
  temp.innerHTML = weather.temp;
  pressure.innerHTML = weather.pressure;
  humidity.innerHTML = weather.humidity;
}
