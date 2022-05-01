import React from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';
import './movie-card.css';

export default class MovieCard extends React.Component {
  cutHandler() {
    let maxLength = 28;
    let ShortOverview = this.props.movie.overview.split(' ');
    if (ShortOverview.length >= maxLength) {
      ShortOverview.length = maxLength;
      ShortOverview.push('...');
    }
    ShortOverview = ShortOverview.join(' ');
    return ShortOverview;
  }

  render() {
    const { urlPicture, name, rate, releaseDate, overview } = this.props.movie;
    try {
      const date = new Date(releaseDate);
      const formatDate = format(date, 'MMMM d, Y');

      return (
        <div className="movies__card movie-card">
          <img src={urlPicture} />
          <div className="movie-card__info">
            <div className="movie-card__head">
              <h2 className="movie-card__title">{name}</h2>
              <span className="movie-card__head-rate">{rate}</span>
            </div>
            <span className="movie-card__release-date">{formatDate}</span>
            <div className="movie-card__genres">
              <span className="movie-card__genre">Action</span>
              <span className="movie-card__genre">Drama</span>
            </div>
            <div className="movie-card__body-wrapper">
              <span className="movie-card__description">{this.cutHandler()}</span>
              <Rate count={10} allowHalf></Rate>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      return (
        <div className="movies__card movie-card">
          <img src={urlPicture} />
          <div className="movie-card__info">
            <div className="movie-card__head">
              <h2 className="movie-card__title">{name}</h2>
              <span className="movie-card__head-rate">{rate}</span>
            </div>
            <span className="movie-card__release-date">Date not available :(</span>
            <div className="movie-card__genres">
              <span className="movie-card__genre">Action</span>
              <span className="movie-card__genre">Drama</span>
            </div>
            <div className="movie-card__body-wrapper">
              <span className="movie-card__description">{this.cutHandler()}</span>
              <Rate count={10} allowHalf></Rate>
            </div>
          </div>
        </div>
      );
    }
  }
}
