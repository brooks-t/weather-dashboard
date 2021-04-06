today = moment().format('L');
var searchButton = document.querySelector('#search-button');
var searchForm = document.querySelector('#search-form');
var searchField = document.querySelector('#search-field');
var headResult = document.querySelector('#results-header');
var tempResult = document.querySelector('#temp-result');
var humidResult = document.querySelector('#humid-result');
var windResult = document.querySelector('#wind-result');
var uvResult = document.querySelector('#uv-result');
var pastSearch = document.querySelector('#past-search');
var currentIcon = document.querySelector('#current-icon').src;
var weatherIcon = document.getElementById('#current-icon');
var uvCondition = document.querySelector('#uv-condition');
var searchCity;
var searchAgain;


var uvCall = 'https://api.openweathermap.org/data/2.5/uvi?lat=47.6062&lon=-122.3321&appid=8b9474b76db97cf9c54177ce617e7e88';

// retrieving stored searches from localStorage and building list
function storedCities() {
    if (localStorage.getItem('storedCities') == null) {
        localStorage.setItem('storedCities', '[]');
    }
    var storedCities = JSON.parse(localStorage.getItem('storedCities'));

    for (i = 0; i < storedCities.length; i++) {
        var savedCity = document.createElement('li');
        savedCity.textContent = storedCities[i];
        pastSearch.appendChild(savedCity);
    }
}

// get weather conditions
function searchWeather(event) {
    event.preventDefault();
    searchCity = searchField.value;
    
    // check for stored searches and store new one
    var storedCities = JSON.parse(localStorage.getItem('storedCities'));
    storedCities.push(searchField.value);
    localStorage.setItem('storedCities', JSON.stringify(storedCities));

    var savedCity = document.createElement('li');
    savedCity.textContent = searchField.value;
    pastSearch.appendChild(savedCity);

    var currentWeatherCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

    // get current weather
    fetch(currentWeatherCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            var cityIcon = data.weather[0].icon;
            var cityTemp = data.main.temp;
            var cityHumid = data.main.humidity;
            var cityWind = data.wind.speed;

            // display current weather for searched city
            headResult.textContent = searchCity + ' ' + '(' + today + ')';
            currentIcon = 'https://openweathermap.org/img/wn/' + cityIcon + '@2x.png';
            document.getElementById('current-icon').src = currentIcon;
            tempResult.textContent = 'Temperature: ' + cityTemp;
            humidResult.textContent = 'Humidity: ' + cityHumid + '%';
            windResult.textContent = 'Wind Speed: ' + cityWind + 'MPH';
            
           
            var getUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&exclude=minutely,hourly,daily,alerts&appid=8b9474b76db97cf9c54177ce617e7e88';

             // get UV index
            fetch(getUV)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var cityUV = data.current.uvi;
                    uvCondition.textContent = cityUV;

                    // set color indicator for uv index
                    if (cityUV < 3) {
                        uvCondition.setAttribute('style', 'background-color: green');
                    } else if (cityUV > 2 && cityUV < 6) {
                        uvCondition.setAttribute('style', 'background-color: yellow; color: black');
                    } else {
                        uvCondition.setAttribute('style', 'background-color: red');
                    }
                })
        })

        var forecastCall = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

        // get 5 day forecast
        fetch(forecastCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Day 1
            var cardHeader1 = document.querySelector('#card-header-1');
            var cardIcon1 = document.querySelector('#card-icon-1').src;
            var cardTemp1 = document.querySelector('#card-temp-1');
            var cardHumid1 = document.querySelector('#card-humid-1');

            cardHeader1.textContent = moment().add(1, 'd').format('L');
            foreIcon1 = data.list[7].weather[0].icon;
            cardIcon1 = 'https://openweathermap.org/img/wn/' + foreIcon1 + '@2x.png';
            document.getElementById('card-icon-1').src =  cardIcon1;
            cardTemp1.textContent = 'Temp: ' + data.list[7].main.temp + ' F';
            cardHumid1.textContent = 'Humidity: ' + data.list[7].main.humidity + '%';

            // Day 2
            var cardHeader2 = document.querySelector('#card-header-2');
            var cardIcon2 = document.querySelector('#card-icon-2').src;
            var cardTemp2 = document.querySelector('#card-temp-2');
            var cardHumid2 = document.querySelector('#card-humid-2');

            cardHeader2.textContent = moment().add(2, 'd').format('L');
            foreIcon2 = data.list[15].weather[0].icon;
            cardIcon2 = 'https://openweathermap.org/img/wn/' + foreIcon2 + '@2x.png';
            document.getElementById('card-icon-2').src =  cardIcon2;
            cardTemp2.textContent = 'Temp: ' + data.list[15].main.temp + ' F';
            cardHumid2.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';

            // Day 3
            var cardHeader3 = document.querySelector('#card-header-3');
            var cardIcon3 = document.querySelector('#card-icon-3');
            var cardTemp3 = document.querySelector('#card-temp-3');
            var cardHumid3 = document.querySelector('#card-humid-3');

            cardHeader3.textContent = moment().add(3, 'd').format('L');
            foreIcon3 = data.list[23].weather[0].icon;
            cardIcon3 = 'https://openweathermap.org/img/wn/' + foreIcon3 + '@2x.png';
            document.getElementById('card-icon-3').src =  cardIcon3;
            cardTemp3.textContent = 'Temp: ' + data.list[23].main.temp + ' F';
            cardHumid3.textContent = 'Humidity: ' + data.list[23].main.humidity + '%';

            // Day 4
            var cardHeader4 = document.querySelector('#card-header-4');
            var cardIcon4 = document.querySelector('#card-icon-4');
            var cardTemp4 = document.querySelector('#card-temp-4');
            var cardHumid4 = document.querySelector('#card-humid-4');

            cardHeader4.textContent = moment().add(4, 'd').format('L');
            foreIcon4 = data.list[31].weather[0].icon;
            cardIcon4 = 'https://openweathermap.org/img/wn/' + foreIcon4 + '@2x.png';
            document.getElementById('card-icon-4').src =  cardIcon4;
            cardTemp4.textContent = 'Temp: ' + data.list[31].main.temp + ' F';
            cardHumid4.textContent = 'Humidity: ' + data.list[31].main.humidity + '%';

            // Day 5
            var cardHeader5 = document.querySelector('#card-header-5');
            var cardIcon5 = document.querySelector('#card-icon-5');
            var cardTemp5 = document.querySelector('#card-temp-5');
            var cardHumid5 = document.querySelector('#card-humid-5');

            cardHeader5.textContent = moment().add(5, 'd').format('L');
            foreIcon5 = data.list[39].weather[0].icon;
            cardIcon5 = 'https://openweathermap.org/img/wn/' + foreIcon5 + '@2x.png';
            document.getElementById('card-icon-5').src =  cardIcon5;
            cardTemp5.textContent = 'Temp: ' + data.list[39].main.temp + ' F';
            cardHumid5.textContent = 'Humidity: ' + data.list[39].main.humidity + '%';
        })
}

// use past saved search
function searchHistory(event) {
    event.stopPropagation();
    var element = event.target;

    if (element.matches('li')) {
        searchAgain = event.target.textContent;
        console.log("You searched for " + searchAgain + " again!");
    }

    var currentWeatherCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchAgain + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

    fetch(currentWeatherCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            var cityIcon = data.weather[0].icon;
            var cityTemp = data.main.temp;
            var cityHumid = data.main.humidity;
            var cityWind = data.wind.speed;

            headResult.textContent = searchAgain + ' ' + '(' + today + ')';
            currentIcon = 'https://openweathermap.org/img/wn/' + cityIcon + '@2x.png';
            document.getElementById('current-icon').src = currentIcon;
            tempResult.textContent = 'Temperature: ' + cityTemp;
            humidResult.textContent = 'Humidity: ' + cityHumid + '%';
            windResult.textContent = 'Wind Speed: ' + cityWind + 'MPH';
            
            var getUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&exclude=minutely,hourly,daily,alerts&appid=8b9474b76db97cf9c54177ce617e7e88';

            fetch(getUV)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var cityUV = data.current.uvi;
                    uvCondition.textContent = cityUV;

                    if (cityUV < 3) {
                        uvCondition.setAttribute('style', 'background-color: green');
                    } else if (cityUV > 2 && cityUV < 6) {
                        uvCondition.setAttribute('style', 'background-color: yellow; color: black');
                    } else {
                        uvCondition.setAttribute('style', 'background-color: red');
                    }
                })
        })

        var forecastCall = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchAgain + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

        fetch(forecastCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Day 1
            var cardHeader1 = document.querySelector('#card-header-1');
            var cardIcon1 = document.querySelector('#card-icon-1').src;
            var cardTemp1 = document.querySelector('#card-temp-1');
            var cardHumid1 = document.querySelector('#card-humid-1');

            cardHeader1.textContent = moment().add(1, 'd').format('L');
            foreIcon1 = data.list[7].weather[0].icon;
            cardIcon1 = 'https://openweathermap.org/img/wn/' + foreIcon1 + '@2x.png';
            document.getElementById('card-icon-1').src =  cardIcon1;
            cardTemp1.textContent = 'Temp: ' + data.list[7].main.temp + ' F';
            cardHumid1.textContent = 'Humidity: ' + data.list[7].main.humidity + '%';

            // Day 2
            var cardHeader2 = document.querySelector('#card-header-2');
            var cardIcon2 = document.querySelector('#card-icon-2').src;
            var cardTemp2 = document.querySelector('#card-temp-2');
            var cardHumid2 = document.querySelector('#card-humid-2');

            cardHeader2.textContent = moment().add(2, 'd').format('L');
            foreIcon2 = data.list[15].weather[0].icon;
            cardIcon2 = 'https://openweathermap.org/img/wn/' + foreIcon2 + '@2x.png';
            document.getElementById('card-icon-2').src =  cardIcon2;
            cardTemp2.textContent = 'Temp: ' + data.list[15].main.temp + ' F';
            cardHumid2.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';

            // Day 3
            var cardHeader3 = document.querySelector('#card-header-3');
            var cardIcon3 = document.querySelector('#card-icon-3');
            var cardTemp3 = document.querySelector('#card-temp-3');
            var cardHumid3 = document.querySelector('#card-humid-3');

            cardHeader3.textContent = moment().add(3, 'd').format('L');
            foreIcon3 = data.list[23].weather[0].icon;
            cardIcon3 = 'https://openweathermap.org/img/wn/' + foreIcon3 + '@2x.png';
            document.getElementById('card-icon-3').src =  cardIcon3;
            cardTemp3.textContent = 'Temp: ' + data.list[23].main.temp + ' F';
            cardHumid3.textContent = 'Humidity: ' + data.list[23].main.humidity + '%';

            // Day 4
            var cardHeader4 = document.querySelector('#card-header-4');
            var cardIcon4 = document.querySelector('#card-icon-4');
            var cardTemp4 = document.querySelector('#card-temp-4');
            var cardHumid4 = document.querySelector('#card-humid-4');

            cardHeader4.textContent = moment().add(4, 'd').format('L');
            foreIcon4 = data.list[31].weather[0].icon;
            cardIcon4 = 'https://openweathermap.org/img/wn/' + foreIcon4 + '@2x.png';
            document.getElementById('card-icon-4').src =  cardIcon4;
            cardTemp4.textContent = 'Temp: ' + data.list[31].main.temp + ' F';
            cardHumid4.textContent = 'Humidity: ' + data.list[31].main.humidity + '%';

            // Day 5
            var cardHeader5 = document.querySelector('#card-header-5');
            var cardIcon5 = document.querySelector('#card-icon-5');
            var cardTemp5 = document.querySelector('#card-temp-5');
            var cardHumid5 = document.querySelector('#card-humid-5');

            cardHeader5.textContent = moment().add(5, 'd').format('L');
            foreIcon5 = data.list[39].weather[0].icon;
            cardIcon5 = 'https://openweathermap.org/img/wn/' + foreIcon5 + '@2x.png';
            document.getElementById('card-icon-5').src =  cardIcon5;
            cardTemp5.textContent = 'Temp: ' + data.list[39].main.temp + ' F';
            cardHumid5.textContent = 'Humidity: ' + data.list[39].main.humidity + '%';
        })
}

storedCities();

searchButton.addEventListener('click', searchWeather);

pastSearch.addEventListener('click', searchHistory);

searchForm.addEventListener('submit', searchWeather);







/*for(i = 0; i < data.length; i++) {
    console.log(data.city)
}
});*/

/* WEATHER:
current conditions:
City/Date - weather icon
temperature:
humidity:
wind speed:
UV Index: with color indicator

future conditions:
5 day forecast with 5 cards
date
weather icon
temperature
humidity
*/ 

/*
console.log('FORECAST \n-------------');
console.log(forecastCall);
console.log(data);
console.log(data.list[8].weather[0].description);
console.log(data.list[8].main.temp);
console.log(data.list[8].main.humidity);
*/