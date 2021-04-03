today = moment().format('L');
var searchField = document.querySelector('#search-field');
var searchButton = document.querySelector('#search-button');

currentWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';

uvCall = 'http://api.openweathermap.org/data/2.5/uvi?lat=47.6062&lon=-122.3321&appid=8b9474b76db97cf9c54177ce617e7e88';

forecastCall = 'http://api.openweathermap.org/data/2.5/forecast?q=Seattle&units=imperial&appid=8b9474b76db97cf9c54177ce617e7e88';



function getWeather() {
    fetch(currentWeatherCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        console.log('CURRENT WEATHER \n-------------');
        console.log(data);
        console.log(data.name);
        console.log(today);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        console.log(data.weather[0].description);
        console.log(cityLat);
        console.log(cityLon);
  })
}

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

function getForecast() {
    fetch(forecastCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        tomorrow = moment().add(1, 'd').format('L');
        console.log('FORECAST \n-------------');
        console.log(data);
        console.log(tomorrow);
        console.log(data.list[8].weather[0].description);
        console.log(data.list[8].main.temp);
        console.log(data.list[8].main.humidity);
    })
}

//getUV();


// TODO: finish building this event listener for search button
searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log("search button clicked!");
    getWeather();
    getForecast();
})


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