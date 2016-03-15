import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {TransitionMotion, spring, Motion} from 'react-motion';
import { toggleControls } from '../actions';

import Button from './common/Button';
import Icon from './common/Icon';

import classNames from 'classnames/bind';
import styles from '../styles/views/controls.css';
const cx = classNames.bind(styles);

const SetControls = ({onCorrect, onIncorrect, onToggle}) => {
  const classes = cx('segment showControls'.split(' '));
  const markerClass = cx('marker');
  const correctClass = cx('correct');
  const incorrectClass = cx('incorrect');
  const flipClass = cx('flip');
  return (
    <div className={classes}>
      <Button className={markerClass}><Icon icon="slack"/></Button>
      <Button className={incorrectClass} onClick={onIncorrect}><Icon icon="remove"/></Button>
      <Button className={flipClass} onClick={onToggle}><Icon icon="undo"/></Button>
      <Button className={correctClass} onClick={onCorrect}><Icon icon="checkmark"/></Button>
    </div>
  );
};

SetControls.propTypes = {
  onCorrect: PropTypes.func.isRequired,
  onIncorrect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

const mapStateToProps = (state, prop) => ({
  showControls: state.getIn(['studySession', 'showControls'])
});

export default connect(mapStateToProps, {
  toggleControls
})(SetControls);
