'use strict';

// express server, and we use required for these
const express = require('express');

// dotenv.config is required too
require('dotenv').config();

// data is our weather.json data we manually pulled over
let data = require('./data/weather.json');

// NGL, I don't know what cors is for but we installed it and are using it
const cors = require('cors');

// app is defined as the express argument we made earlier, which we use, and pass the cors function as a requirement
const app = express();
app.use(cors());

// then our port that we set up in the .env file
const PORT = process.env.PORT || 3001;


//Routes 
app.get('/weather', (req, res, next) => {
  try {  // we're not using lat/lon here per Sheyna's instructions
    let city = data.find(cityData => {
      return cityData.city_name === cityQuery;
    });
    let cityQuery = req.query.searchQuery;
    
    
    let weatherData = city.data.map(info => {
      return new Forecast(info);
    });

    res.send(weatherData);
    
  } catch (error) {
    next(error);
  }
});


// Forecast class, using date/description per the instructions
class Forecast {
  constructor(WeatherObj) {
    this.date = WeatherObj.datetime;
    this.description = `Low of ${WeatherObj.data[0].low_temp}, high of ${WeatherObj.data[0].max_temp} with ${WeatherObj.data[0].weather.description}`;
  }
}

// error checking
app.get('*', (req, res) => {
  res.send('The resource requested does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Listening
app.listen(PORT, () => {
  console.log(`Listening...port ${PORT}`);
})