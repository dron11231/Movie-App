import React, { useDebugValue } from 'react';
import './search-form.css';
import * as _ from 'lodash';

import UseDebounce from '../../hooks/hooks';

export default class SearchForm extends React.Component {
  state = {
    value: '',
  };

  onToggleInput = (e) => {
    const inputText = e.target.value;
    this.setState((state) => {
      return {
        value: inputText,
      };
    });
  };

  render() {
    return <Input text={this.state.value} onToggleInput={this.onToggleInput} searchMovies={this.props.searchMovies} />;
  }
}

function Input({ text, onToggleInput, searchMovies }) {
  const debounced = UseDebounce(searchMovies, 500);
  return (
    <input
      type={'search'}
      className="header__search"
      placeholder="Type to search..."
      value={text}
      onChange={(e) => {
        onToggleInput(e);
        debounced(text);
      }}
    />
  );
}
