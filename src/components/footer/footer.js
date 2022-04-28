import React from 'react';
import { Pagination } from 'antd';

import './footer.css';

const Footer = () => {
  return (
    <footer>
      <Pagination total={50} />
    </footer>
  );
};

export default Footer;
