today = moment().calendar();

requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=8b9474b76db97cf9c54177ce617e7e88';

function getApi() {
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
    console.log(data.name);
    console.log(data.weather[0].main);
  })
}


getApi();


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