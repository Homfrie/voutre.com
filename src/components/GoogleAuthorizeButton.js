import React, { Component, PropTypes } from 'react';
import Button from './common/Button';
import Icon from './common/Icon';
import classNames from 'classnames/bind';
import styles from '../styles/components/auth.css';
const cx = classNames.bind(styles);

const GoogleAuthorizeButton = ({onClick}) => {
  const classes = cx(['google', 'button']);
  return (<Button className={classes} onClick={onClick}>
    <Icon icon="google"/>
    Sign-in with Google
  </Button>);
};

GoogleAuthorizeButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default GoogleAuthorizeButton;
