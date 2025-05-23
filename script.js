function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    if (cityName === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = `400c40c842dac228039f48ca6818974f`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });    
} 

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    const kelvinTemp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${Math.round(kelvinTemp - 273.15)}°C`;
    descriptionElement.textContent = `Description: ${description}`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
    sunsetElement.textContent = `Sunset: ${sunsetTime}`;

    weatherInfo.classList.remove('hidden');
    weatherInfo.classList.add('visible');
}
