import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';
import classNames from 'classnames/bind';
import styles from '../../styles/components/input.css';
const cx = classNames.bind(styles);

const Input = ({className, placeholder, type="text", onChange}) => {
  const classes = cx(['input', 'ui', className]);
  const inputElem = typeof onChange === "function" ?
    <DebounceInput
      placeholder={placeholder}
      minLength={2}
      type={type}
      debounceTimeout={300}
      onChange={onChange} /> :
    <input type={type} placeholder={placeholder} />;

  return (
    <div className={classes}>
      {inputElem}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
