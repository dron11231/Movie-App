import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app/app';
import './index.css';

const container = document.getElementById('root');

ReactDom.render(<App />, container);
