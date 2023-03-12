'use strict';
// this is the starter code from lab10 to be refactored into something beautiful

// adding .config to require('dotenv') is for storing things like API keys and passwords securely as part of the .env file, but I'm not really clear on how that happens.
require('dotenv').config;

const express = require('express');
// not really clear on what cors is for
const cors = require('cors');

// movie and weather routes
const getMovies = require('/components/movies.js');
app.get('/movies', getMovies);
const weather = require('/components/weather');
app.get('/weather', weatherHandler);

const app = express();

// I know cors is invoked in this way but I don't know why.  I have review of the cors documentation on MDN to do.
app.use(cors());

// this port call is our canary in the coal mine.  If we get traffic on or looking for port 3002 we know something is awry in our .env file.  What I don't know is if it serves any OTHER actual port traffic function, i.e. could I replace PORT 3002 with a string saying 'hey it's jacked up'?
const PORT = process.env.PORT || 3002;


function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));