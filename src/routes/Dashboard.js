import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DashboardLayout from '../components/Dashboard';

@connect(state => ({
  user: state.getIn(['auth', 'data'])
}))
export default class DashboardRoute extends Component {
  static propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    children: PropTypes.element
  };

  render( ) {
    return (
      <DashboardLayout> 
        {this.props.children}
      </DashboardLayout>
    );
  }
}
