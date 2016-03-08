import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/layouts/app.css';
const cx = classNames.bind(styles);

function AppLayout({ children }) {
  const containerClass = cx({
    ui: true, 
    vertical: true, 
    center: true, 
    aligned: true, 
    segment: true
  });

  const containedClass = cx({
    ui: true,
    container: true
  });

  return (
    <div className={containerClass}>
      <div className={containedClass}>
        {children}
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element
};

export default AppLayout;
