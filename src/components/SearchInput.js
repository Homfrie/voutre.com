import React, { Component, PropTypes } from 'react';

class SearchInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  render() {
    return (<input onChange={this.props.onSearch}/>);
  }
}

export default SearchInput;
