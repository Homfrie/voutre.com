import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/item.css';
const cx = classNames.bind(styles);

const Item = ({className, children}) => {
  const containerClasses = cx(['item']);
  const contentClasses = cx(['content'], className);

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};


export default Item;
