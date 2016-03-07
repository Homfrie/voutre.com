import React, { Component, PropTypes } from 'react';

class DocumentItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired
  };

  render() {
    return <button onClick={this.props.onSelect}>{this.props.data.name}</button>;
  }
}

export default DocumentItem;
