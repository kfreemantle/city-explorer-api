'use strict';

// we need to access the cache from this component so that goes in with the other required items up top

const cache = require('./cache.js');
const axios = require('axios');

class Movie { // movie constructor following documentation from TMDB
  constructor(userMovieSearch) {
    this.title = userMovieSearch.original_title;
    this.overview = userMovieSearch.overview;
    this.average_votes = userMovieSearch.vote_average;
    this.total_votes = userMovieSearch.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${userMovieSearch.poster_path}`;
    this.popularity = userMovieSearch.popularity;
    this.release_on = userMovieSearch.release_date;

  }
}

// getMovies function will get exported at the bottom of the page
async function getMovies(req, res, next) {
  try {
    let city = req.query.search;
    let key = 'Movie data for-' + city;
    let cacheTime = 1000*60*60*24*7; // one week in MS
    let movieAPIData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${city}`);
    // let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${city}&year=2020`  // the year string is giving me grief 
    let processedMovieData = movieAPIData.data.results.map(i => new Movie(i));  // I'm not really understanding how the map function works with this arrow function

    if (cache[key] && Date.now() - cache[key].timestamp < cacheTime) {
      // if the key exists and it's older than a week, acknowledge the cache
      response.status(200).send(cache[key].data);
      console.log('Movie cache hit');
    } else {
      console.log('Movie cache miss'); // fill out the movie cache
      cache[key] = { };
      cache[key].timestamp = Date.now();
    }
    }
  }
}


"title": "Sleepless in Seattle",
    "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
    "average_votes": "6.60",
    "total_votes": "881",
    "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
    "popularity": "8.2340",
    "released_on"