const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2ea46cdfdca8427c9d7c03f2838670c7&query=${longitude},${latitude}&units=s`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} outside. The weather feels like ${body.current.feelslike} inside here. the humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
