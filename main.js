//Selecting html elements 
const cityName = document.querySelector(".city-name p");
const notification = document.querySelector(".notification");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature p");
const weatherDescription = document.querySelector(".weather-description p");
const cityInput = document.querySelector("input");
const button = document.querySelector("button");

//Weather object to store data from API
const weather = {
    tempUnit: "celcius"
};

const APIKey = `2d9744ff6f2f9e6cf91a0782d69bfd84`

//Getting city name with API
function getWeather(e) {
    e.preventDefault();

    //basic form validation
    if (!cityInput.value) {
        return alert("Enter valid city name")
    }
    const chosenCity = cityInput.value;

    let api = `http://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${APIKey}&units=metric`

    fetch(api)
        .then(function (response) {
            let data = response.json()
            return data;
        })
        .then(function (data) {
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.iconID = data.weather[0].icon;
            weather.temperature = data.main.temp.toFixed(1);
            weather.description = data.weather[0].description;
        })
        .then(function () {
            renderDisplay()
        })
        .catch(function (e) {
            console.error(e);
            notification.style.display = "block";
            notification.innerHTML = `<p>Couldn't find your city :(</p>`
        })

}

//render display
function renderDisplay() {
    cityName.innerHTML = `${weather.city}, ${weather.country}`
    weatherIcon.innerHTML = `<img src="icons/${weather.iconID}.png">`
    temperature.innerHTML = weather.temperature + "&#8451"
    weatherDescription.innerHTML = weather.description;

    if (notification.style.display = "block") {
        notification.style.display = "none"
    }

}

//converting celcius to fahrenheit
function celciusToFahrenheit(temp) {
    return ((temp * 9 / 5) + 32).toFixed(1);
}

button.addEventListener("click", getWeather)

//Change temperature unit C / F 
document.querySelector(".temperature").addEventListener("click", function () {
    if (weather.temperature === undefined) return;

    if (weather.tempUnit === "celcius") {
        let fahrenheit = celciusToFahrenheit(weather.temperature);

        temperature.innerHTML = `${fahrenheit}&#8457`
        weather.tempUnit = "fahrenheit"
    } else {
        temperature.innerHTML = `${weather.temperature}&#8451`
        weather.tempUnit = "celcius"
    }

})