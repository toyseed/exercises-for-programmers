/**
 * exercise 50 movie recommendation
 *
 * use imbpapi instead of rotten tomatoes api
 */

const ru = require('../util/read-util');
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.Imdb_ApiKey;
const movieStorate = (function() {
  const cache = {};

  function fromCache(movieName) {
    let cached = cache[movieName];

    if (cached && cached.expired > new Date().getTime()) {
      p('fetched from cache');
      return cached.movieInfo;
    } else {
      return null;
    }
  }

  async function search(movieName) {
    let movieInfo = fromCache(movieName);

    if (!movieInfo) {
      movieInfo = await fetchMovieInfo(movieName);
      cache[movieName] = {
        movieInfo,
        expired: new Date().getTime() + (1000 * 60)
      }
    }

    return Promise.resolve().then(() => movieInfo);
  }

  return {
    search
  };
})();

async function fetchMovieInfo(movieName) {
  return await axios
    .get(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
        movieName
      )}`
    )
    .then(res => res.data);
}

function p(...strs) {
  strs.forEach(str => {
    console.log(str);
  });
}

function messageForRating(rottenRating) {
  const rating = parseInt(rottenRating);
  if (rating >= 80) {
    return 'recommend';
  } else if (rating >= 50) {
    return 'so so';
  } else {
    return 'never';
  }
}

(async () => {
  while (true) {
    const movieName = await ru.question('Enter the name of a movie: ');

    if (!movieName || movieName === '') {
      break;
    }

    const {
      Title: title,
      Year: year,
      Rated: rating,
      Runtime: runtime,
      Plot: desc,
      Ratings: [, {Value: rottenRating}]
    } = await movieStorate.search(movieName);//fetchMovieInfo(movieName);

    p(
      `Title: ${title}`,
      `Year: ${year}`,
      `Rating: ${rating}`,
      `Running Time: ${runtime}`,
      '',
      `Description: ${desc}`,
      '',
      `${messageForRating(rottenRating)}`,
      ''
    );

  }
  process.exit(0);
})();
