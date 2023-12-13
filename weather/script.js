document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    // Check if there is a saved city in localStorage
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
        getWeatherData(savedCity);
    }

    // Event listener for the input field
    cityInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const cityName = cityInput.value.trim();
            if (cityName !== '') {
                getWeatherData(cityName);
            }
        }
    });

    // Function to fetch weather data from AccuWeather API
    async function getWeatherData(cityName) {
        const apiKey = 'AKjMnkeORklQZ62EwxiAabtwp8Gmi4D7';
        const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;

        try {
            // Fetch location key for the city
            const response = await fetch(apiUrl);
            const data = await response.json();
            const locationKey = data[0].Key;

            // Fetch current conditions
            const conditionsUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
            const conditionsResponse = await fetch(conditionsUrl);
            const conditionsData = await conditionsResponse.json();

            // Update the DOM with weather information
            updateWeatherDOM(cityName, conditionsData[0]);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    }

    // Function to update the DOM with weather information
    function updateWeatherDOM(cityName, conditions) {
        const temperature = conditions.Temperature.Metric.Value;
        const weatherCondition = conditions.WeatherText;
        const isDayTime = conditions.IsDayTime;
        const icon = conditions.WeatherIcon;

        // Display weather information
        weatherInfo.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature} &deg;C</p>
            <p>Condition: ${weatherCondition}</p>
            <img src="https://developer.accuweather.com/sites/default/files/${icon < 10 ? '0' : ''}${icon}-s.png" alt="Weather Icon">
            <p>Time of Day: ${isDayTime ? 'Day' : 'Night'}</p>
        `;

        // Show the weather information container
        weatherInfo.style.display = 'block';

        // Save the city to localStorage
        localStorage.setItem('lastCity', cityName);
    }
});