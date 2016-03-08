import React, { Component, PropTypes } from 'react';
import GoogleClient from '../lib/google-client';
import DocumentList from '../components/DocumentList';
import Input from '../components/common/Input';

class DocumentSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ],
      searchQuery: null
    };
    this.gapi = new GoogleClient();
  }
  componentDidMount() {
    this.gapi.load(this.onLoadGAPI.bind(this));
  }
  componentWillUpdate(nextProps, nextState) {
    const nextSearchQuery = nextState.searchQuery;
    const prevSearchQuery = this.state.searchQuery;
    if(nextSearchQuery !== prevSearchQuery) {
      this.searchDriveDocs(nextSearchQuery);
    }
  }
  onLoadGAPI() {
    this.searchDriveDocs( );
  }
  searchDriveDocs(query) {
    this.gapi.searchDriveDocs(query)
      .then((resp, err) => {
        if(!err)
          this.setState({
            data: resp.result.files
          });
      });
  }
  onDocumentSelect(e) {
    console.info(e);
  }
  render() {
    return (
      <div>
        <Input onChange={e => this.setState({searchQuery: e.target.value})}/>
        <DocumentList onSelect={this.onDocumentSelect} data={this.state.data}/>
      </div>
    );
  }
}

export default DocumentSearchContainer;
