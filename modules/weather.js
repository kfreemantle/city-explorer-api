'use strict';
// weather.js starter code for lab10 to be refactored.  I didn't get my original weather.js modularized, so this is the from quasi-scratch attempt.

// still need axios, and if we're doing axios inside of components we don't need it on the server.js file.
const axios = require('axios');
// we're accessing the cache component we made from here same as we would a different required component.  Lecture had it using let but I don't know if it matters.  .js suffix isn't necessary but I left it for my own clarity
const cache = require('./cache.js');

// In the URL below I've included units=I and days=3 in the string for three days of weather observations in freedom units.

async function getWeather(latitude, longitude) {

  const key = 'Weather at:' + latitude + longitude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&days=3&lat=${latitude}&lon=${longitude}`;


  // following is the if else statements to cache the weather observation data in the cache component.  I'm changing the timestamp to 1 hour, or 3600000ms (1000*60*60).

  if (cache[key] && (Date.now() - cache[key].timestamp < 3600000)) {
    console.log('Weather data cache hit');  // if there's data in the 'key' object in the cache AND the cache data is over an hour old, this returns true
    // if not, move to the else statement and start sending weather data to the cache
  } else {
    console.log('Weather data cache miss');
    cache[key] = {};  // cache an empty object first to start containing what's next
    cache[key].timestamp = Date.now();  // current timestamp at time of observation, rendered in Unix epoch time
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }
  console.log(cache[key]); // proof of life for caching data 
  return cache[key].data;

}

function parseWeather(weatherData) {
  try {  // try block here to attempt to map daily weather data to a Weather class
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

// renamed below constructor values to more closely match their definitions
class Weather {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
  }
}

module.exports = getWeather;
