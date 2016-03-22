import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/item.css';
const cx = classNames.bind(styles);

const Item = ({className, children}) => {
  const classes = cx(['item'], className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Item.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};


export default Item;
