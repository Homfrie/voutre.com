import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/list.css';
const cx = classNames.bind(styles);

const List = ({className, children}) => {
  const classes = cx(['ui', 'relaxed', 'list', 'selection'], className);
  return <div className={classes}>{children}</div>;
};

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default List;
