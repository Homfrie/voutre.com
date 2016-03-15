import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import GoogleClient from '../lib/google-client';
import DocumentList from '../components/DocumentList';
import Input from '../components/common/Input';
import {fetchDocs, fetchSet} from '../actions';

class DocumentSearchContainer extends Component {
  static propTypes = {
    fetchDocs: PropTypes.func.isRequired,
    fetchSet: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    documents: ImmutablePropTypes.list.isRequired,
    searchQuery: PropTypes.string
  };
  componentDidMount() {
    this.props.fetchDocs();
  }
  render() {
    return (
      <div>
        <Input onChange={e => this.props.fetchDocs(e.target.value)}/>
        <DocumentList onSelect={(e, id) => this.props.goTo(`/sets/${id}`)} data={this.props.documents}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documents: state.getIn(['docs', 'data'])
});

export default connect(mapStateToProps, {
  fetchDocs: fetchDocs,
  fetchSet: fetchSet,
  goTo: browserHistory.push 
})(DocumentSearchContainer);
