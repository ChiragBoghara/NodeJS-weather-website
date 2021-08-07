const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "lat=" +
    lat +
    "&lon=" +
    long +
    "&units=imperial&appid=b89f26285a355c079a65a5eae380b9d0";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // device is connected to internet
      //low level error
      callback("Unable to connect to weather service", undefined);
    } else if (body.message) {
      //url is not valid
      //lat long is invalid
      callback("Unable to find location.Try another search", undefined);
    } else {
      const data = {
        description: body.weather[0].description,
        temprature: body.main.temp,
        feels_like: body.main.feels_like,
        humidity: body.main.humidity,
        wind_speed: body.wind.speed,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
