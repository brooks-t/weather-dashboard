requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=8b9474b76db97cf9c54177ce617e7e88';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });