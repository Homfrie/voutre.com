import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/grid.css';
const cx = classNames.bind(styles);

const Grid = ({children, className}) => {
  const classes = cx(['ui', 'grid'], className);
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Grid;
