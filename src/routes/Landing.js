import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {replace, push} from 'react-router-redux';
import {userAuthorize} from '../actions';

import Landing from '../components/Landing';

@connect(state => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn']),
  getToken: state.getIn(['auth', 'getToken'])
}), {replace, userAuthorize, push})
export default class LandingView extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    userAuthorize: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  };

  componentWillMount( ) {
    const { query } = this.props.location;
    if(this.props.isSignedIn) {
      this.props.replace('/dashboard');
    }
    else if(query.code) {
      this.props.userAuthorize(query.code);
      this.props.replace('/');
    }
  }

  render( ) {
    return (
      <Landing/>
    );
  }
}
