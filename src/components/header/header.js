import React from 'react';
import './header.css';

import SearchForm from '../search-form/search-form';

const Header = ({ searchMovies }) => {
  return (
    <header className="header">
      <div className="header__pagination pagination">
        <button className="pagination__item pagination__item--active">Search</button>
        <button className="pagination__item ">Rated</button>
      </div>
      <SearchForm searchMovies={searchMovies} />
    </header>
  );
};

export default Header;
