import React from 'react';
import { Pagination } from 'antd';

import './footer.css';

const Footer = ({ moviesCount, searchMovies, query, totalPages }) => {
  const pages = Number(totalPages + '0');
  const content =
    moviesCount === 0 ? (
      <Pagination disabled />
    ) : (
      <Pagination
        total={pages}
        onChange={(value) => {
          searchMovies(query, value);
        }}
      />
    );
  return <footer>{content}</footer>;
};

export default Footer;
