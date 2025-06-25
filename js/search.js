let apiKey = "b66cb5ee41f85cdaa2e46796f71376bc";
let searchinput = document.querySelector(`.searchinput`);

async function search(query){
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${apiKey}`);

    if(url.ok){
        let data = await url.json();
        console.log(data);
        
        let box = document.querySelector(".return");
        box.style.display = "block";

        let message = document.querySelector(".message");
        message.style.display = "none";

        let errormessage = document.querySelector( ".error-message");
        errormessage.style.display = "none";

        let weatherImg = document.querySelector(".weather-img");
        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
        document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
        document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
        document.querySelector('.humidity').innerHTML = Math.floor(data.main.humidity)+ "%";
        document.querySelector(".sunrise").innerHTML =  new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
        document.querySelector(".sunset").innerHTML =  new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});

        let weatherCondition = data.weather[0].main.toLowerCase();
        let weatherDescription = data.weather[0].description.toLowerCase();

        // Set weather icon
        if (weatherCondition === "rain") {
            weatherImg.src = "img/rain.png";
        } else if (weatherCondition === "clear") {
            weatherImg.src = "img/sun.png";
        } else if (weatherCondition === "snow") {
            weatherImg.src = "img/snow.png";
        } else if (weatherCondition === "clouds" || weatherCondition === "smoke") {
            weatherImg.src = "img/cloud.png";
        } else if (weatherCondition === "mist" || weatherCondition === "fog") {
            weatherImg.src = "img/mist.png";
        } else if (weatherCondition === "haze") {
            weatherImg.src = "img/haze.png";
        } else if (weatherCondition === "thunderstorm") {
            weatherImg.src = "img/thunderstorm.png";
        } else if (weatherCondition === "drizzle") {
            weatherImg.src = "img/rain.png";
        } else {
            weatherImg.src = "img/sun.png";
        }

        // Set background based on weather
        let backgroundGif = "";
        switch (weatherCondition) {
            case "thunderstorm":
                backgroundGif = "img/storm-background.gif";
                break;
            case "drizzle":
            case "rain":
                if (weatherDescription.includes("light") || weatherDescription.includes("moderate")) {
                    backgroundGif = "img/rain-background.gif";
                } else if (weatherDescription.includes("heavy") || weatherDescription.includes("extreme") || weatherDescription.includes("very heavy")) {
                    backgroundGif = "img/heavy-rain-background.gif";
                } else {
                    backgroundGif = "img/rain-background.gif";
                }
                break;
            case "snow":
                if (weatherDescription.includes("light")) {
                    backgroundGif = "img/light-snow-background.gif";
                } else if (weatherDescription.includes("heavy")) {
                    backgroundGif = "img/heavy-snow-background.gif";
                } else {
                    backgroundGif = "img/light-snow-background.gif";
                }
                break;
            case "clear":
                backgroundGif = "img/sunny-background.gif";
                break;
            case "clouds":
                backgroundGif = "img/cloudy-background.gif";
                break;
            case "mist":
            case "smoke":
            case "haze":
            case "fog":
            case "sand":
            case "dust":
            case "ash":
            case "squall":
            case "tornado":
                backgroundGif = "img/windy-background.gif";
                break;
            default:
                backgroundGif = "img/sunny-background.gif";
        }
        if (backgroundGif) {
            document.body.style.backgroundImage = `url('${backgroundGif}')`;
        }
    } else {
        let box = document.querySelector(".return");
        box.style.display = "none";

        let message = document.querySelector(".message");
        message.style.display = "none";

        let errormessage = document.querySelector(".error-message");
        errormessage.style.display = "block";
    }
}

// Remove suggestions dropdown logic and restore original searchinput event
searchinput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value);
        console.log("worked")
    }
});