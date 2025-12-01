
const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2f7c49f96e7efeec97ef555dd585899c";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            displayError(error.message || "Something went wrong");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    card.innerHTML = "";
    card.style.display = "flex";

    const icon = document.createElement("div");
    icon.classList.add("weatherIcon");
    icon.textContent = getWeatherEmoji(data.weather[0].id);

    const city = document.createElement("h2");
    city.textContent = `${data.name}, ${data.sys.country}`;

    const temp = document.createElement("p");
    temp.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;

    const desc = document.createElement("p");
    desc.textContent = `Weather: ${data.weather[0].description}`;

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const wind = document.createElement("p");
    wind.textContent = `Wind: ${data.wind.speed} m/s`;

    card.appendChild(icon);
    card.appendChild(city);
    card.appendChild(temp);
    card.appendChild(desc);
    card.appendChild(humidity);
    card.appendChild(wind);
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 500) return "🌦️";
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId === 801) return "🌤️";
    if (weatherId === 802) return "⛅";
    if (weatherId === 803 || weatherId === 804) return "☁️";
    return "🌈";
}

function displayError(message) {
    card.innerHTML = "";
    card.style.display = "flex";

    const errorMessage = document.createElement("p");
    errorMessage.classList.add("errorDisplay");
    errorMessage.textContent = message;

    card.appendChild(errorMessage);
}
