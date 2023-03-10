'use strict';

// express server, and we use required for these
const express = require('express');

// AXIOS requirement
const axios = require('axios');

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
 
// WeatherBit URL with API key ref for daily forecast.  string has API KEY, then units=I for freedom units, 3 days instead of default 10, then lat/long plugged in from the return from the LocationIQ API.  This will get moved to a component later.

// refactored route to live weather data
app.get('/weather', async (req, res, next) => {
  try {  
    // including lat/lon for lab08 forward
    let latitude = req.query.lat;
    let longitude = req.query.lon;
    let cityQuery = req.query.searchQuery;
    // parking the URL in variable for readability
    let weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=3&lat=${latitude}&lon=${longitude}`;
    // now parking axios await for the same reason
    let axiosResponse = await axios.get(weatherBitURL);
    let liveData = axiosResponse.data;

    // mapping the data from weatherbit
    let weatherData = liveData.data.map(requestedWeatherData => {
      return new Forecast(requestedWeatherData);
    }); 
    res.send(weatherData);
  } catch (error) {
    next(error);
  }
    
});






// Forecast class, using date/description per the instructions
class Forecast {
  constructor(WeatherObj) {
    console.log('testConstructor', WeatherObj);
    this.date = WeatherObj.datetime;
    // verbose description as a template literal in order to render data from the data objects
    this.description = `Low of ${WeatherObj.low_temp}, high of ${WeatherObj.max_temp} with ${WeatherObj.weather.description}`;
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
});
