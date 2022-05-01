import errorImg from './img-error.jpg';

export default class MovieDbService {
  query = null;
  page = null;

  async getMovies(query, page) {
    this.query = query;
    this.page = page;
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=015c61e2d3e437ff4bf8ef4893d9f416&query=${this.query}&page=${this.page}`
    );
    const jsonRes = await res.json();
    return jsonRes;
  }

  async getPoster(id, movies) {
    let posterUrl;
    movies.forEach((movie) => {
      if (movie.id === id) {
        if (movie.poster_path !== null) {
          posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        } else {
          posterUrl = errorImg;
        }
      }
    });
    return posterUrl;
  }

  async getGenres(ids) {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=015c61e2d3e437ff4bf8ef4893d9f416');
    const jsonRes = await res.json();
    let genres = [];
    ids.forEach((id) => {
      jsonRes.genres.forEach((genre) => {
        if (genre.id === id) {
          genres.push(genre.name);
        }
      });
    });
    return genres;
  }
}

/* async getGenre(id) {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=015c61e2d3e437ff4bf8ef4893d9f416');
    const jsonRes = await res.json();
    let genres = [];
    jsonRes.genres.forEach((genre) => {
      if (genre.id === id) {
        genres.push(genre.name);
      }
    });
    return genres;
  }
 */
