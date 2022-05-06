import React from 'react';

import MovieCard from '../movie-card/movie-card';
import './movies.css';
import './movies-resize.css';

export default class Movies extends React.Component {
  render() {
    if (this.props.tabRated) {
      const elems = this.props.ratedMovies.map((movie) => {
        return <MovieCard movie={movie} key={movie.id} rate={this.props.rate} />;
      });
      return <div className="movies">{elems}</div>;
    } else {
      const elems = this.props.movies.map((movie) => {
        return <MovieCard movie={movie} key={movie.id} rate={this.props.rate} />;
      });
      return <div className="movies">{elems}</div>;
    }
  }
}
