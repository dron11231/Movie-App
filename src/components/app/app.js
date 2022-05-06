import React from 'react';
import { Spin } from 'antd';

import WarningMessage from '../warning-message/warning-message';
import ErrorIndicator from '../error-indicator/error-indicator';
import MovieDbService from '../../services/movieDb-service';
import Header from '../header/header';
import Movies from '../movies/movies';
import Footer from '../footer/footer';
import { GenresProvider } from '../genres-context/genres-context';

import './app.css';
import 'antd/dist/antd.css';

export default class App extends React.Component {
  state = {
    movies: [],
    ratedMovies: [],
    genreList: [],
    query: null,
    loading: false,
    error: false,
    resize: false,
    warning: false,
    notFound: false,
    moviesUnmount: false,
    tabRated: false,
    totalPages: 0,
  };

  rate = (id, value) => {
    if (localStorage[id] !== undefined) {
      let movie = JSON.parse(localStorage[id]);
      movie.userRate = value;
      movie = JSON.stringify(movie);
      localStorage.setItem(id, movie);
    } else {
      const newArr = [...this.state.movies];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr[idx].userRate = value;
      let newItem = JSON.stringify(newArr[idx]);
      localStorage.setItem(id, newItem);
    }
    if (this.state.tabRated) {
      const newArr = [...this.state.ratedMovies];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr[idx].userRate = value;
      this.setState({
        ratedMovies: newArr,
      });
    } else {
      const ratedMoviesArr = [];
      const newArr = [...this.state.movies];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr[idx].userRate = value;
      for (let i = 0; i < localStorage.length; i++) {
        let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (ratedMoviesArr[i] !== undefined) {
          if (ratedMoviesArr[i].id !== item.id) {
            ratedMoviesArr.push(item);
          } else {
            ratedMoviesArr[i].userRate = item.userRate;
          }
        } else {
          ratedMoviesArr.push(item);
        }
      }

      this.setState({
        movies: newArr,
        ratedMovies: ratedMoviesArr,
      });
    }
  };

  toggleTab = (rated) => {
    if (rated) {
      this.setState({
        tabRated: true,
      });
    } else {
      this.setState({
        tabRated: false,
      });
    }
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

  resizeHandler = () => {
    this.setState({
      resize: true,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    const newArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      newArr.push(item);
    }
    this.setState({
      ratedMovies: newArr,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getGenres = async () => {
    const moviesService = new MovieDbService();
    const res = await moviesService.getGenreList();
    return res;
  };

  searchMovies = (query, page) => {
    if (!query) {
      return;
    }
    this.getGenres().then((res) => {
      const newArr = [...res.genres];
      this.setState({
        genreList: newArr,
      });
    });
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
            error: false,
          });
        }
        this.setState({
          movies: [],
          query: query,
        });
        const newArr = [...this.state.movies];
        movies.forEach(async (movie) => {
          /* let genres = await moviesService.getGenres(movie.genre_ids); */
          let picture = await moviesService.getPoster(movie.id, movies);
          if (localStorage[movie.id] !== undefined) {
            const storageMovie = JSON.parse(localStorage[movie.id]);
            newArr.push({
              name: movie.title,
              genre: movie.genre_ids,
              overview: movie.overview,
              urlPicture: picture,
              rating: movie.vote_average,
              id: movie.id,
              releaseDate: movie.release_date,
              userRate: Number(storageMovie.userRate),
            });
          } else {
            newArr.push({
              name: movie.title,
              genre: movie.genre_ids,
              overview: movie.overview,
              urlPicture: picture,
              rating: movie.vote_average,
              id: movie.id,
              releaseDate: movie.release_date,
              userRate: 0,
            });
          }

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
    const mainContent = loading ? (
      <Spin size="large" />
    ) : (
      <Movies
        movies={this.state.movies}
        ratedMovies={this.state.ratedMovies}
        rate={this.rate}
        tabRated={this.state.tabRated}
      />
    );
    const warningMessage = warning ? <WarningMessage notFound={this.state.notFound} /> : null;
    return (
      <div className="container">
        <Header searchMovies={this.searchMovies} toggleTab={this.toggleTab} tabRated={this.state.tabRated} />
        <main>
          <GenresProvider value={this.state.genreList}>{mainContent}</GenresProvider>
          {errorMessage}
          {warningMessage}
        </main>
        <Footer
          error={error}
          moviesCount={this.state.movies.length}
          query={this.state.query}
          searchMovies={this.searchMovies}
          totalPages={this.state.totalPages}
          tabRated={this.state.tabRated}
        />
      </div>
    );
  }
}
