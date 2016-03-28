import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';
import styles from '../../styles/components/list.css';
const cx = classNames.bind(styles);

const List = ({className, children}) => {
  const classes = cx(['ui', 'relaxed', 'list', 'selection'], className);
  return <div className={classes}>{children}</div>;
};

List.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: ImmutablePropTypes.listOf(PropTypes.element).isRequired
};

export default List;
