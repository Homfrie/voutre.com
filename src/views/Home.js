import React from 'react';
import { Link } from 'react-router';
import UserAuthContainer from '../containers/UserAuth';
import Grid from '../components/common/Grid';

import classNames from 'classnames/bind';
import styles from '../styles/views/home.css';
const cx = classNames.bind(styles);

const Home = () => {
  const containerClass = cx({
    ui: true, 
    vertical: true, 
    center: true, 
    aligned: true, 
    segment: true,
    home: true
  });

  const gridLeftClass= cx({
    eight: true, 
    wide: true,
    column: true,
    leadin: true
  });

  const gridRightClass = cx({
    four: true, 
    wide: true,
    column: true
  });

  return (
    <div className={containerClass}>
      <Grid>
        <div className={gridLeftClass}>
          Welcome to voutre.com, a pain free way to study cards on your laptop or phone.
        </div>
        <div className={gridRightClass}>
          <UserAuthContainer/>
        </div>
      </Grid>
    </div>
  );
};
//test

export default Home;
