import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/components/icon.css';
const cx = classNames.bind(styles);

const Icon = ({icon}) => {
  const classes = cx(['icon', icon]);

  return <i className={classes}></i>;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
