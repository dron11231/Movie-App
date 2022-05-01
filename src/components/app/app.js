import React from 'react';
import { Spin } from 'antd';
import { toHaveDisplayValue, toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

import WarningMessage from '../warning-message/warning-message';
import ErrorIndicator from '../error-indicator/error-indicator';
import MovieDbService from '../../services/movieDb-service';
import Header from '../header/header';
import Movies from '../movies/movies';
import Footer from '../footer/footer';

import './app.css';
import 'antd/dist/antd.css';

export default class App extends React.Component {
  state = {
    movies: [],
    query: null,
    loading: false,
    error: false,
    warning: false,
    notFound: false,
    moviesUnmount: false,
    totalPages: 0,
  };

  onWarn = () => {
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({
          warning: true,
        });
        if (!this.state.notFound) {
          this.onWarn();
        }
      } else if (!this.state.notFound) {
        this.setState({
          warning: false,
        });
      }
    }, 7000);
  };

  searchMovies = (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ loading: true });
    const moviesService = new MovieDbService();
    moviesService
      .getMovies(query, page)
      .then((res) => {
        this.setState({
          totalPages: res.total_pages,
        });
        return res.results;
      })
      .then((movies) => {
        if (movies === undefined || movies.length === 0) {
          this.setState({
            movies: [],
            notFound: true,
            loading: false,
            warning: true,
          });
          return;
        } else {
          this.setState({
            warning: false,
          });
        }
        this.setState({
          movies: [],
          query: query,
        });
        const newArr = [...this.state.movies];
        movies.forEach(async (movie) => {
          let genres = await moviesService.getGenres(movie.genre_ids);
          let picture = await moviesService.getPoster(movie.id, movies);

          newArr.push({
            name: movie.title,
            genre: genres,
            overview: movie.overview,
            urlPicture: picture,
            rate: movie.vote_average,
            id: movie.id,
            releaseDate: movie.release_date,
          });

          this.setState(() => {
            return {
              movies: newArr,
              loading: false,
            };
          });
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: true,
        });
      });
    this.onWarn();
  };

  render() {
    const { loading, error, warning, notFound } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const mainContent = loading ? <Spin size="large" /> : <Movies movies={this.state.movies} />;
    const warningMessage = warning ? <WarningMessage notFound={this.state.notFound} /> : null;
    return (
      <div className="container">
        <Header searchMovies={this.searchMovies} />
        <main>
          {mainContent}
          {errorMessage}
          {warningMessage}
        </main>
        <Footer
          error={error}
          moviesCount={this.state.movies.length}
          query={this.state.query}
          searchMovies={this.searchMovies}
          totalPages={this.state.totalPages}
        />
      </div>
    );
  }
}

/*export default class Movies extends React.Component {
  componentDidUpdate() {
    console.log(this.props.movies);
  }

  render() {
    console.log(this.props.movies);
    const elems = this.props.movies.map((movie) => {
      return <MovieCard movies={this.props.movies} key={movie.id} />;
    });
    return <div>{elems}</div>;
  }
}  */
