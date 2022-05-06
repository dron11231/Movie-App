import React from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import './movie-card.css';
import './movie-card-resize.css';

import Genres from '../genres/genres';

export default class MovieCard extends React.Component {
  state = {
    rate: false,
  };

  setRate = () => {
    this.setState({
      rate: true,
    });
  };

  cutHandler = () => {
    let maxLength = 28;
    let ShortOverview = this.props.movie.overview.split(' ');
    if (ShortOverview.length >= maxLength) {
      ShortOverview.length = maxLength;
      ShortOverview.push('...');
    }
    ShortOverview = ShortOverview.join(' ');
    return ShortOverview;
  };

  /* componentDidUpdate() {
    if (this.state.rate) {
      localStorage.setItem(this.props.movie.id, JSON.stringify(this.props.movie));
    }
  } */

  componentDidMount() {
    if (this.props.movie.userRate) {
      this.setState({ rate: true });
    }
  }

  render() {
    const { urlPicture, name, rating, releaseDate, userRate, id, overview } = this.props.movie;
    let ratingColor;
    if (rating >= 0 && rating < 3) ratingColor = 'bad';
    if (rating >= 3 && rating < 5) ratingColor = 'not-bad';
    if (rating >= 5 && rating < 7) ratingColor = 'good';
    if (rating >= 7) ratingColor = 'wonderful';
    let finalDate;
    try {
      const date = new Date(releaseDate);
      const formatDate = format(date, 'MMMM d, Y');
      finalDate = formatDate;
    } catch (err) {
      if (err.message === 'Invalid time value') {
        finalDate = 'Date not available :(';
      } else {
        throw new Error(err);
      }
    }
    if (screen.width >= 600) {
      return (
        <Movie
          urlPicture={urlPicture}
          name={name}
          rating={rating}
          finalDate={finalDate}
          cutHandler={this.cutHandler}
          rate={this.props.rate}
          userRate={userRate}
          id={id}
          ratingColor={ratingColor}
          movie={this.props.movie}
          setRate={this.setRate}
        />
      );
    } else {
      return (
        <MovieMobile
          urlPicture={urlPicture}
          name={name}
          rating={rating}
          finalDate={finalDate}
          cutHandler={this.cutHandler}
          rate={this.props.rate}
          userRate={userRate}
          id={id}
          ratingColor={ratingColor}
          movie={this.props.movie}
          setRate={this.setRate}
        />
      );
    }
  }
}

function Movie({
  urlPicture,
  name,
  rating,
  finalDate,
  cutHandler,
  userRate,
  id,
  ratingColor,
  movie,
  rate,
  setRate,
  onRate,
}) {
  return (
    <div className="movies__card movie-card">
      <img src={urlPicture} />
      <div className="movie-card__info">
        <div className="movie-card__head">
          <h2 className="movie-card__title">{name}</h2>
          <span className={'movie-card__head-rate' + ' ' + ratingColor}>{rating}</span>
        </div>
        <span className="movie-card__release-date">{finalDate}</span>
        <Genres movie={movie} />
        <div className="movie-card__body-wrapper">
          <span className="movie-card__description">{cutHandler()}</span>
          <Rate
            count={10}
            allowHalf
            value={userRate}
            onChange={(e) => {
              rate(id, e);
              setRate();
            }}
          ></Rate>
        </div>
      </div>
    </div>
  );
}

function MovieMobile({
  urlPicture,
  name,
  rating,
  finalDate,
  cutHandler,
  userRate,
  id,
  ratingColor,
  movie,
  rate,
  setRate,
}) {
  return (
    <div className="movies__card movie-card">
      <div className="movie-card__info">
        <div className="movie-card__head">
          <img src={urlPicture} />
          <div className="movie-card__head-container">
            <h2 className="movie-card__title">{name}</h2>
            <span className={'movie-card__head-rate' + ' ' + ratingColor}>{rating}</span>
            <span className="movie-card__release-date">{finalDate}</span>
            <Genres movie={movie} />
          </div>
        </div>
        <div className="movie-card__body-wrapper">
          <span className="movie-card__description">{cutHandler()}</span>
          <Rate
            count={10}
            allowHalf
            value={userRate}
            onChange={(e) => {
              rate(id, e);
              setRate();
            }}
          ></Rate>
        </div>
      </div>
    </div>
  );
}

/* if (err.message === 'Invalid time value') {
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
      } else {
        throw new Error(err);
      } */
