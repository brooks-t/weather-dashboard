today = moment().format('L');
var searchButton = document.querySelector('#search-button');
var searchField = document.querySelector('#search-field');
var headResult = document.querySelector('#results-header');
var tempResult = document.querySelector('#temp-result');
var humidResult = document.querySelector('#humid-result');
var windResult = document.querySelector('#wind-result');
var uvResult = document.querySelector('#uv-result');
var pastSearch = document.querySelector('#past-search');


var uvCall = 'http://api.openweathermap.org/data/2.5/uvi?lat=47.6062&lon=-122.3321&appid=8b9474b76db97cf9c54177ce617e7e88';


// not sure where the UV index is listed in the data returned here. there is a value key but not sure if that's it. the documentation says its a float longitude for returned data which doesn't make any sense because they give that to us with the 'lon' key.
function getUV() {
    fetch(uvCall)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('UV INDEX \n-------------');
    console.log(data);
  })
}

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

function searchWeather(event) {
    event.preventDefault();

    headResult.textContent = searchField.value + ' ' + '(' + today + ')' + '⛅';

    var storedCities = JSON.parse(localStorage.getItem('storedCities'));
    storedCities.push(searchField.value);
    localStorage.setItem('storedCities', JSON.stringify(storedCities));

    var savedCity = document.createElement('li');
    savedCity.textContent = storedCities[i];
    pastSearch.appendChild(savedCity);

    var currentWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchField.value + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

    fetch(currentWeatherCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            var cityTemp = data.main.temp;
            var cityHumid = data.main.humidity;
            var cityWind = data.wind.speed;
            var cityUv = 'TBD';

            tempResult.textContent = 'Temperature: ' + cityTemp;
            humidResult.textContent = 'Humidity: ' + cityHumid + '%';
            windResult.textContent = 'Wind Speed: ' + cityWind + 'MPH';
            uvResult.textContent = 'UV Index: Unknown';
        })

        var forecastCall = 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchField.value + '&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

        fetch(forecastCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Day 1
            var cardHeader1 = document.querySelector('#card-header-1');
            var cardIcon1 = document.querySelector('#card-icon-1');
            var cardTemp1 = document.querySelector('#card-temp-1');
            var cardHumid1 = document.querySelector('#card-humid-1');

            cardHeader1.textContent = moment().add(1, 'd').format('L');
            cardTemp1.textContent = 'Temp: ' + data.list[7].main.temp + ' F';
            cardHumid1.textContent = 'Humidity: ' + data.list[7].main.humidity + '%';

            // Day 2
            var cardHeader2 = document.querySelector('#card-header-2');
            var cardIcon2 = document.querySelector('#card-icon-2');
            var cardTemp2 = document.querySelector('#card-temp-2');
            var cardHumid2 = document.querySelector('#card-humid-2');

            cardHeader2.textContent = moment().add(2, 'd').format('L');
            cardTemp2.textContent = 'Temp: ' + data.list[15].main.temp + ' F';
            cardHumid2.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';

            // Day 3
            var cardHeader3 = document.querySelector('#card-header-3');
            var cardIcon3 = document.querySelector('#card-icon-3');
            var cardTemp3 = document.querySelector('#card-temp-3');
            var cardHumid3 = document.querySelector('#card-humid-3');

            cardHeader3.textContent = moment().add(3, 'd').format('L');
            cardTemp3.textContent = 'Temp: ' + data.list[23].main.temp + ' F';
            cardHumid3.textContent = 'Humidity: ' + data.list[23].main.humidity + '%';

            // Day 4
            var cardHeader4 = document.querySelector('#card-header-4');
            var cardIcon4 = document.querySelector('#card-icon-4');
            var cardTemp4 = document.querySelector('#card-temp-4');
            var cardHumid4 = document.querySelector('#card-humid-4');

            cardHeader4.textContent = moment().add(4, 'd').format('L');
            cardTemp4.textContent = 'Temp: ' + data.list[31].main.temp + ' F';
            cardHumid4.textContent = 'Humidity: ' + data.list[31].main.humidity + '%';

            // Day 5
            var cardHeader5 = document.querySelector('#card-header-5');
            var cardIcon5 = document.querySelector('#card-icon-5');
            var cardTemp5 = document.querySelector('#card-temp-5');
            var cardHumid5 = document.querySelector('#card-humid-5');

            cardHeader5.textContent = moment().add(5, 'd').format('L');
            cardTemp5.textContent = 'Temp: ' + data.list[39].main.temp + ' F';
            cardHumid5.textContent = 'Humidity: ' + data.list[39].main.humidity + '%';
        
        })
}

function searchHistory(event) {
    event.stopPropagation();
    var element = event.target;
    if (element.matches('li')) {
        searchField = event.target.textContent;
        console.log("You searched for " + searchField + " again!");
    }
}

storedCities();

searchButton.addEventListener('click', searchWeather);

pastSearch.addEventListener('click', searchHistory);


// TODO: finish building this event listener for search button


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