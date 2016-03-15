import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/button.css';
const cx = classNames.bind(styles);

const Button = ({children, className, onClick}) => {
  const classes = cx([], className);

  return <button onClick={onClick} className={classes}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
