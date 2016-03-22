import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import UserAuthContainer from '../UserAuth';
import DocumentSearchContainer from '../DocumentSearch';

import classNames from 'classnames/bind';
import styles from '../../styles/views/tutorial.css';
const cx = classNames.bind(styles);

const TutorialView = ({isSignedIn}) => {
  const containerClass = cx('segment');
  const step1Class = cx(['step1', 'step']);
  const step2Class = cx(['step2', 'step']);
  const step3Class = cx(['step3', 'step']);
  const step4Class = cx(['step4', 'step']);
  const stepsClass = cx('steps');
  const pageName = cx('page-name');
  const stepName = cx('step-name');
  const docLink = "https://docs.google.com/document/d/1d29aYFwM-2KEZz6ohQ9Kv1ePS1MpLm9alBLK6qDn_Ps/edit?usp=sharing";

  return (
    <div className={containerClass}>
      <div className={pageName}><h1>How does it work?</h1></div>
      <div className={stepsClass}>
        <div className={step1Class}>
          <h2 className={stepName}>Create a Google Doc</h2>
          <p>You can also make a copy of our's by clicking: <a target="_blank" href={docLink}>French Verb Doc</a>.</p>
        </div>
        <div className={step2Class}>
          <h2 className={stepName}>Add words you want to study</h2>
          <p>While we plan to support more formats in the near future, for now we just support the following, take note of the spaces flanking the hyphen!</p>
          <pre>front - back</pre>
        </div>
        <div className={step3Class}>
          <h2 className={stepName}>Sign-in through Google</h2>
          <p>Sign-in through Google and find the doc you just created.</p>
          {
            isSignedIn ? 
              <DocumentSearchContainer /> : 
              <UserAuthContainer/>
          }
        </div>
      </div>
    </div>
  );
};

TutorialView.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn'])
});

export default connect(mapStateToProps)(TutorialView);
