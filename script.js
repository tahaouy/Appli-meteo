function getWeather() {
    const city = document.getElementById("ville").value;
    const apiKey = "b9fc7ccd767c8f02d78333045699b865"; 

    if (!city) {
        alert('Entrez une ville');
        return;
    }

    const meteomtn = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(meteomtn)
    .then(response => response.json())
    .then(data => {
        affichermeteo(data);
    })
    .catch(error => {
        console.error('Erreur obtention météo maintenant data:', error);
        alert('Erreur obtention météo maintenant data. Réessayez encore.');
    });
}

function affichermeteo(data) {
    const meteoinfo = document.getElementById('meteo-info');
    const meteoicon = document.getElementById('meteo-icon');
    const humidicon = document.getElementById('humid-icon');
    const venticon = document.getElementById('vent-icon');

    if (data.cod === '404') {
        meteoinfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const humidityHTML = `<p>${humidity}%</p>`;
        const windSpeedHTML = `<p>${windSpeed} m/s</p>`;

        meteoinfo.innerHTML = temperatureHTML;
        meteoicon.src = iconUrl;
        humidicon.src = 'humidite.png';
        venticon.src = 'vent.png';

        document.getElementById('humidity-info').innerHTML = humidityHTML;
        document.getElementById('wind-speed-info').innerHTML = windSpeedHTML;
    }
}


