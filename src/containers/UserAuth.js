import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import GoogleAuthorizeButton from '../components/GoogleAuthorizeButton';
import {googleUserAuthorizeStart} from '../actions';
import DocumentSearchContainer from './DocumentSearch';
import GoogleClient from '../lib/google-client';

class UserAuthContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired
  }
  onGoogleAuthorize( ) {
    this.props.login( );
  }
  render() {
    return (
      <div>
        {this.props.isSignedIn ? 
          <DocumentSearchContainer /> : 
          <GoogleAuthorizeButton onClick={this.onGoogleAuthorize.bind(this)}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn'])
});

export default connect(mapStateToProps, {
 login: googleUserAuthorizeStart 
})(UserAuthContainer);
