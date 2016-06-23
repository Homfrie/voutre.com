import React, { Component, PropTypes } from 'react';
import styleable from 'react-styleable';
import Button from '../common/Button';
import Icon from '../common/Icon';
import styles from './styles.css';
import config from '../../config';

@styleable(styles)
export default class FacebookAuthorizeButton extends Component {
  static propTypes = {
    css: PropTypes.object.isRequired
  }
  render( ) {
    const url = `https://www.facebook.com/dialog/oauth?client_id=${config.facebook.clientId}&scope=${config.facebook.scope}&redirect_uri=${config.oauthRedirectUrl}`;
    return (<a className={this.props.css.facebook} href={url}>
              <Icon icon="facebook"/>
              Sign-in with Facebook
            </a>);
  }
}
