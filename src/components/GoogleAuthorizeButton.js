import React, { Component, PropTypes } from 'react';

class GoogleAuthorizeButton extends Component {
  static propTypes = {
    onGoogleAuthorize: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.onGoogleAuthorize}>Sign-in</button>;
  }
}

export default GoogleAuthorizeButton;
