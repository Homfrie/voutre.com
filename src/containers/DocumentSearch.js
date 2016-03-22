import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import DocumentList from '../components/DocumentList';
import Input from '../components/common/Input';
import {fetchDocs, fetchSet} from '../actions';

import classNames from 'classnames/bind';
import styles from '../styles/components/document-search.css';
const cx = classNames.bind(styles);

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
    const classes = cx(['segment']);
    return (
      <div className={classes}>
        <Input placeholder="search google drive" className="" onChange={e => this.props.fetchDocs(e.target.value)}/>
        <DocumentList data={this.props.documents}/>
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
