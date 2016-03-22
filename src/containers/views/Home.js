import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import UserAuthContainer from '../UserAuth';
import DocumentSearchContainer from '../DocumentSearch';
import {Link} from 'react-router';

import classNames from 'classnames/bind';
import styles from '../../styles/views/home.css';
const cx = classNames.bind(styles);

const HomeView = ({isSignedIn}) => {
  const containerClass = cx('segment');
  const headerClass = cx('header');
  const logoClass = cx('logo');
  const leadinClass = cx('leadin');
  const helpClass = cx('help');
  const authDocsClass = cx('auth-docs');

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <div className={logoClass}>
          voutre 
        </div>
        <div className={leadinClass}>
          flashcards made easy 
        </div>
      </div>
      <div className={authDocsClass}>
      {
        isSignedIn ? 
          <DocumentSearchContainer /> : 
          <UserAuthContainer/>
      }
      </div>
      <div className={helpClass}>
        <Link to="/tutorial">How does it work?</Link>
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
