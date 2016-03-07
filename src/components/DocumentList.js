import React, { Component, PropTypes } from 'react';
import GoogleClient from '../lib/google-client';
import DocumentItem from './DocumentItem';

class DocumentList extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  }
  render() {
    const documentItems = this.props.data.map(document => {
      return (
        <DocumentItem key={document.id} onSelect={this.props.onSelect} data={document} />
      );
    });
    return (
      <div>
        {documentItems}
      </div>
    );
    //<DocumentList data={this.state.data} />;
  }
}

export default DocumentList;
