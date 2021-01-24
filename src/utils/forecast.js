const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d89b635f144dc94de50f019b0b0879a0&query=${latitude},${longitude}`;

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (res.body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            const { current } = res.body;
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out, But it feels like ${current.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;