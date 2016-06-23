import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {fetchSets, saveSet} from '../actions';
import Search from '../components/Search';

@connect(state => ({
  sets: state.getIn(['sets', 'data']),
  query: state.getIn(['sets', 'query']),
  setId: state.getIn(['set', 'id'])
}),{saveSet, fetchSets, push})
export default class SearchRoute extends Component {
  static propTypes = {
    sets: ImmutablePropTypes.list.isRequired,
    query: PropTypes.string.isRequired,
    saveSet: PropTypes.func.isRequired,
    fetchSets: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    setId: PropTypes.number
  }
  componentWillReceiveProps(nextProps) {
    if(!this.props.setId && nextProps.setId) {
      this.props.push(`/dashboard/sets/${nextProps.setId}/edit`);
    }
  }
  onSearch( e ) {
    this.props.fetchSets(e.target.value);
  }
  onCreateSet() {
    this.props.saveSet({name: this.props.query});
  }
  render( ) {
    return (
      <Search data={this.props.sets} 
              query={this.props.query} 
              onCreateSet={e => this.onCreateSet( )} 
              onSearch={e => this.onSearch(e)}/>
    );
  }
}
