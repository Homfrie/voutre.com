import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import GoogleAuthorizeButton from '../components/GoogleAuthorizeButton';
import {googleUserAuthorizeStart} from '../actions';

class UserAuthContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  render() {
    return (<GoogleAuthorizeButton onClick={this.props.login.bind(null, false)}/>);
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn'])
});

export default connect(
  mapStateToProps,
  { login: googleUserAuthorizeStart }
)(UserAuthContainer);
