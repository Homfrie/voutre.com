import React, { Component, PropTypes } from 'react';
import styleable from 'react-styleable';
import Button from '../common/Button';
import Icon from '../common/Icon';
import styles from './styles.css';
import config from '../../config';

@styleable(styles)
export default class GoogleAuthorizeButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    css: PropTypes.object.isRequired
  }
  render( ) {
    return (<Button className={this.props.css.google} onClick={this.props.onClick}>
            <Icon icon="google"/>
            Sign-in with Google
            </Button>);
  }
}
