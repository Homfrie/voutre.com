import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import UserAuthContainer from '../UserAuth';
import DocumentSearchContainer from '../DocumentSearch';

import classNames from 'classnames/bind';
import styles from '../../styles/views/home.css';
const cx = classNames.bind(styles);

const HomeView = ({isSignedIn}) => {
  const containerClass = cx('home'.split(' '));
  const leadinClass = cx('leadin'.split(' '));
  const authDocsClass = cx('auth-docs'.split(' '));

  return (
    <div className={containerClass}>
      <div className={leadinClass}>
        Welcome to voutre.com, a pain free way to study cards on your laptop or phone.
        </div>
        <div className={authDocsClass}>
          {
            isSignedIn ? 
              <DocumentSearchContainer /> : 
              <UserAuthContainer/>
          }
        </div>
    </div>
  );
};

HomeView.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn'])
});

export default connect(mapStateToProps)(HomeView);
