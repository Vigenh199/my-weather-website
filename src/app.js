// Core modules
const path = require('path');
// npm modules
const express = require('express');
const hbs = require('hbs');
// Our modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Setting static files, views and partials directory paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting Express to use handlebar engine and configuring views and partials path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setting directory to serve static files
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Vigen"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Vigen"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help text',
        title: 'Help',
        name: "Vigen"
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (err, data) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(data.latitude, data.longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                location: data.location,
                forecast: forecastData
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: "Vigen"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: "Vigen"
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
