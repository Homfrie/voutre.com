import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';

import classNames from 'classnames/bind';
import styles from '../styles/components/input.css';
const cx = classNames.bind(styles);

class SearchInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };


  render() {
    const containerClass = cx({
      input: true,
      search: true
    });

    return(
      <div className={containerClass}>
        <DebounceInput
              placeholder="Search..."
              minLength={2}
              debounceTimeout={300}
              onChange={this.props.onSearch} />
      </div>);
  }
}

export default SearchInput;
