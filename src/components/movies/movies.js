import React from 'react';

import MovieCard from '../movie-card/movie-card';
import './movies.css';
import './movies-resize.css';

const Movies = function ({ movies, rate, tabRated }) {
  const ratedMovies = [];
  for (let i = 0; i < localStorage.length; i++) {
    const ratedMovie = JSON.parse(localStorage.getItem(localStorage.key(i)));
    ratedMovies.push(ratedMovie);
  }
  if (tabRated) {
    const elems = ratedMovies.map((movie) => {
      return <MovieCard movie={movie} key={movie.id} rate={rate} />;
    });
    return <div className="movies">{elems}</div>;
  } else {
    const elems = movies.map((movie) => {
      return <MovieCard movie={movie} key={movie.id} rate={rate} />;
    });
    return <div className="movies">{elems}</div>;
  }
};

export default Movies;
