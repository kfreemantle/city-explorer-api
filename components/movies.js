'use strict';

// we need to access the cache from this component so that goes in with the other required items up top

const cache = require('./cache.js');
const axios = require('axios');

class Movie { // movie constructor following documentation from TMDB
  constructor(userMovieSearch) {
    this.title = userMovieSearch.original_title;
    this.overview = userMovieSearch.overview;
    this.avg_votes = userMovieSearch.vote_average;
    this.total_votes = userMovieSearch.vote_count;
    this.img_url = `https://image.tmdb.org/t/p/w500${userMovieSearch.poster_path}`;
    this.popularity = userMovieSearch.popularity;
    this.release_date = userMovieSearch.release_date;

  }
}



"title": "Sleepless in Seattle",
    "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
    "average_votes": "6.60",
    "total_votes": "881",
    "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
    "popularity": "8.2340",
    "released_on"