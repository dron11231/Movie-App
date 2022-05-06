import React from 'react';
import './header.css';

import SearchForm from '../search-form/search-form';

export default class Header extends React.Component {
  componentDidMount() {
    const pagination = document.querySelector('.pagination');
    const paginationBtn1 = document.querySelector('.pagination-btn-1');
    const paginationBtn2 = document.querySelector('.pagination-btn-2');
    const activeClass = 'pagination__item--active';
    pagination.addEventListener('click', (e) => {
      if (e.target === paginationBtn1 && !paginationBtn1.classList.contains(activeClass)) {
        paginationBtn1.classList.add(activeClass);
        paginationBtn2.classList.remove(activeClass);
      } else {
        paginationBtn2.classList.add(activeClass);
        paginationBtn1.classList.remove(activeClass);
      }
    });
  }

  render() {
    const searchForm = this.props.tabRated ? null : <SearchForm searchMovies={this.props.searchMovies} />;
    return (
      <header className="header">
        <div className="header__pagination pagination">
          <button
            className={'pagination-btn-1 pagination__item pagination__item--active'}
            onClick={() => {
              this.props.toggleTab();
            }}
          >
            Search
          </button>
          <button
            className="pagination-btn-2 pagination__item"
            onClick={() => {
              this.props.toggleTab(true);
            }}
          >
            Rated
          </button>
        </div>
        {searchForm}
      </header>
    );
  }
}
