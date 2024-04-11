fetch('conf.json')
    .then(response => response.json())
    .then(config => {
        const city = config.city;
        const apiKey = config.apiKey;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        fetchWeather(apiUrl);
    })
    .catch(error => {
        console.error('Erreur lors de la lecture du fichier conf.json :', error);
    });

async function fetchWeather(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données météorologiques :', error);
    }
}

function displayWeather(data) {
    const weatherDataElement = document.getElementById('weatherData');
    const content = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather Description: ${data.weather[0].description}</p>
    `;
    weatherDataElement.innerHTML = content;
}
