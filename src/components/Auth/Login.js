import React, { Component, PropTypes } from 'react';
import styleable from 'react-styleable';
import styles from './styles.css';
import GoogleAuthorizeButton from './GoogleAuthorizeButton';
import FacebookAuthorizeButton from './FacebookAuthorizeButton';


const Login = () => {
  return (
    <FacebookAuthorizeButton/>

  ); 
};

export default Login;
