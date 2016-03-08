import React, { Component, PropTypes } from 'react';
import Button from './common/Button';
import classNames from 'classnames/bind';

const GoogleAuthorizeButton = ({onClick}) => {
  return <Button onClick={onClick}>Sign-in</Button>;
};

GoogleAuthorizeButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default GoogleAuthorizeButton;
