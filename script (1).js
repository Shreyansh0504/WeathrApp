const apiKey = 'e11a5619ed2bd7597ac1c2697c144f26'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('city').value;

    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => alert('City not found!'));
    } else {
        alert('Please enter a city name!');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.style.display = 'block';

    const cityName = document.getElementById('cityName');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const wdata = document.getElementById('wdata');  // Weather description text

    // Clear previous content
    weatherDescription.innerHTML = "";
    wdata.innerHTML = "";

    // Update the text content with the weather data
    cityName.textContent = ` ${data.name}`;
    temperature.textContent = ` ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Create and set the weather icon based on the weather description
    let weatherIcon = document.createElement('img');
    weatherIcon.alt = data.weather[0].description; // Add alt text for accessibility
    weatherIcon.width = 100;

    // Map weather descriptions to custom icon paths
    const description = data.weather[0].description.toLowerCase();
    switch (description) {
        case 'clear':
        case "clear sky":
            weatherIcon.src = 'images/clear.png';
            break;
        case 'cloudy':
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
        case 'overcast clouds':
            weatherIcon.src = 'images/clouds.png';
            break;
        case 'wind':
            weatherIcon.src = 'images/wind.png';
            break;
        case 'drizzle':
            weatherIcon.src = 'images/drizzle.png';
            break;
        case 'rain':
        case 'shower rain':
            weatherIcon.src = 'images/rain.png';
            break;
        case 'snow':
            weatherIcon.src = 'images/snow.png';
            break;
        case 'haze':
            weatherIcon.src = 'images/wind.png';
            break;
        case 'mist':
            weatherIcon.src = 'images/mist.png';
            break;
        case 'humidity':
            weatherIcon.src = 'images/humidity.png';
            break;
        default:
            weatherIcon.src = 'images/search.png'; // Default icon if none of the conditions match
            break;
    }

    // Add the weather description text to wdata
    wdata.textContent = data.weather[0].description;

    // Append the text first, followed by the icon
    weatherDescription.appendChild(wdata); // Add the text at the top
    weatherDescription.appendChild(weatherIcon); // Add the icon after the text
}
