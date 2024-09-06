const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static CSS files
app.use(express.static('public'));

// Render index.ejs on GET request
app.get('/', (req, res) => {
    res.render('index');
});

// POST request to fetch weather data
app.post('/', (req, res) => {
    const city = req.body.cityName;
    const apiKey = '3fdf9e745fc4c16c9768c34babc691e0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}.png`;

            // Render the weather result page
            res.render('weather', { city, temp, description, imageURL });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
