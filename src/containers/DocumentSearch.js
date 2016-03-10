import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import GoogleClient from '../lib/google-client';
import DocumentList from '../components/DocumentList';
import Input from '../components/common/Input';
import {fetchDocs, selectSet} from '../actions';

class DocumentSearchContainer extends Component {
  static propTypes = {
    fetchDocs: PropTypes.func.isRequired,
    documents: ImmutablePropTypes.list.isRequired,
    searchQuery: PropTypes.string
  };

  componentDidMount() {
    this.props.fetchDocs();
  }
  onDocumentSelect(e) {
    //TODO document has been selected, load up flash cards
  }
  render() {
    return (
      <div>
        <Input onChange={e => this.props.fetchDocs(e.target.value)}/>
        <DocumentList onSelect={this.onDocumentSelect} data={this.props.documents}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.getIn(['docs', 'data'])
});

export default connect(mapStateToProps, {
 fetchDocs: fetchDocs,
 selectSet: selectSet
})(DocumentSearchContainer);
