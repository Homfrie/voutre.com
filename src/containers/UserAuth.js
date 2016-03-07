import React, { Component, PropTypes } from 'react';
import GoogleAuthorizeButton from '../components/GoogleAuthorizeButton';
import DocumentSearchContainer from './DocumentSearch';
import GoogleClient from '../lib/google-client';

class UserAuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isSignedIn: false,
      documents: null,
      nextPageToken: null
    };
    this.gapi = new GoogleClient();
  }
  componentDidMount( ){
    this.gapi.load(this.onLoadGAPI.bind(this));
  }
  onLoadGAPI( ) {
    this.gapi.authorize(this.onAuthSuccess.bind(this), 
                        this.onAuthFailure.bind(this), 
                        true);
  }
  onAuthSuccess( e ) {
    this.setState({isSignedIn: true});
  }
  onAuthFailure( ) {
    this.setState({isSignedIn: false});
  }
  onGoogleAuthorize( ) {
    this.gapi.authorize(this.onAuthSuccess.bind(this), 
                        this.onAuthFailure.bind(this),
                        false);
  }
  render() {
    return (
      <div>
        {this.state.isSignedIn ? 
          <DocumentSearchContainer /> : 
          <GoogleAuthorizeButton onGoogleAuthorize={this.onGoogleAuthorize.bind(this)}/>}
      </div>
    );
  }
}

export default UserAuthContainer;
