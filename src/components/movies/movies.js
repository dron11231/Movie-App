import React from 'react';

import MovieCard from '../movie-card/movie-card';
import './movies.css';

const Movies = function ({ movies }) {
  const elems = movies.map((movie) => {
    return <MovieCard movie={movie} key={movie.id} />;
  });
  return <div className="movies">{elems}</div>;
};

export default Movies;
