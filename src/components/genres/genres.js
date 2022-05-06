import React from 'react';

import { GenresConsumer } from '../genres-context/genres-context';

export default class Genres extends React.Component {
  render() {
    return (
      <GenresConsumer>
        {(genresList) => {
          let genres = genresList.map((genre) => {
            let genreName;
            this.props.movie.genre.forEach((el) => {
              if (genre.id === el) {
                genreName = genre.name;
              }
            });
            if (genreName) {
              return (
                <span key={genre.id} className="movie-card__genre">
                  {genreName}
                </span>
              );
            }
          });
          return <div className="movie-card__genres">{genres}</div>;
        }}
      </GenresConsumer>
    );
  }
}

/* export default class Genres extends React.Component {
  render() {
    let genres = this.props.movie.genre;
    genres = genres.map((elem) => {
      return (
        <span key={this.props.movie.id} className="movie-card__genre">
          {elem}
        </span>
      );
    });

    return <div className="movie-card__genres">{genres}</div>;
  }
} */
