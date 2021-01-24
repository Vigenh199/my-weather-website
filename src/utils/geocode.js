const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlnZW5oMTk5IiwiYSI6ImNrazZpcmE5YjA0ZTMycW8wN2prbnI3OWEifQ.7ilaAohltea_PkYd5dWlOw&limit=1`;

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to geocode service!', undefined);
        }
        else if (res.body.features.length === 0) {
            callback('Unable to find geocode for that location', undefined);
        }
        else {
            const feature = res.body.features[0];
            callback(undefined, {
                longitude: feature.center[0],
                latitude: feature.center[1],
                location: feature.place_name
            });
        }
    })
};

module.exports = geocode;