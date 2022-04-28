import React from 'react';

import MovieDbService from '../../services/movieDb-service';
import Header from '../header/header';
import Movies from '../movies/movies';
import Footer from '../footer/footer';

import 'antd/dist/antd.css';

export default class App extends React.Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    let maxElemsOnPage = 6;
    const moviesService = new MovieDbService();
    moviesService.getMovies().then((movies) => {
      const newArr = [...this.state.movies];
      movies.forEach(async (movie) => {
        maxElemsOnPage--;
        if (maxElemsOnPage >= 0) {
          let genres = await moviesService.getGenres(movie.genre_ids);
          let picture = await moviesService.getPoster(movie.id);

          newArr.push({
            name: movie.title,
            genre: genres,
            overview: movie.overview,
            urlPicture: picture,
            rate: movie.vote_average,
            id: movie.id,
            releaseDate: movie.release_date,
          });
        }
        this.setState((state) => {
          return {
            movies: newArr,
          };
        });
      });
    });
  }

  render() {
    if (this.state.movies.length > 0) {
      return (
        <div>
          <Header />
          <main>
            <Movies movies={this.state.movies} />
          </main>
          <Footer />
        </div>
      );
    } else {
      return <span>loading...</span>;
    }
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
