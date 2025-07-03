document.addEventListener("DOMContentLoaded", () => {
    // Dom Elements
    let cityName = document.getElementById("cityInput");
    let button = document.getElementById("submit");
    let resultBox = document.getElementById("weatherResult");

    function getWeatherByLocation() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1fd2ba9b626de37ae0fc9653b3b05831&units=metric`);
          let data = await response.json();
          updateData(data);
        },
        (error) => {
          console.error("Geolocation error:", error);
          document.querySelector('.city').innerText = "Location denied";
          document.querySelector('.temp').innerText = "-";
          document.querySelector('.weather').innerText = "-";
        }
      );
    }

    // Call it on page load
    getWeatherByLocation();

    button.addEventListener("click", async (e) => {
        e.preventDefault();
        await getWeatherData(cityName.value);
        e.stopPropagation();
    });
});

function formatTime(unixTimestamp) {
    if (!unixTimestamp) return '-';
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateData(data){
    let city = data.name;
    let weather = data.weather[0].main;
    let temperature  = data.main.temp;
    let windSpeed = data.wind.speed;
    let humidity = data.main.humidity;
    let pressure = data.main.pressure;
    let visibility = data.visibility;
    let feelsLike = data.main.feels_like;
    let sealevel = data.main.sea_level;
    let groundlevel = data.main.grnd_level;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;

    // Update main box
    document.querySelector('.city').innerText = city;
    document.querySelector('.temp').innerText = `${Math.round(temperature)}° C`;
    document.querySelector('.weather').innerText = weather;
    document.querySelector('.humidity').innerText = `💧${humidity}%`;
    document.querySelector('.windSpeed').innerText = `💨${windSpeed}km/h`;

    // Update details list
    document.getElementById('pressure').innerText = pressure ? `${pressure} hPa` : '-';
    document.getElementById('visibility').innerText = visibility ? `${visibility/1000} km` : '-';
    document.getElementById('feelslike').innerText = feelsLike ? `${Math.round(feelsLike)}° C` : '-';
    document.getElementById('sealevel').innerText = sealevel ? `${sealevel} hPa` : '-';
    document.getElementById('groundlevel').innerText = groundlevel ? `${groundlevel} hPa` : '-';
    document.getElementById('sunrise').innerText = formatTime(sunrise);
    document.getElementById('sunset').innerText = formatTime(sunset);
}

async function getWeatherData(name){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1fd2ba9b626de37ae0fc9653b3b05831&units=metric`);
    let data = await response.json();
    updateData(data);
}

