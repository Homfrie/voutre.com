import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Button from './common/Button';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames/bind';
import styles from '../styles/views/card.css';
const cx = classNames.bind(styles);

const Card = ({card, showAnswer}) => {
  const classes = cx(('segment' + (showAnswer ? ' show-answer' : '')).split(' '));
  const frontClass = cx('front');
  const backClass = cx('back');

  return (
    <CSSTransitionGroup transitionAppear transitionAppearTimeout={2000} transitionEnterTimeout={2000} transitionLeaveTimeout={2000} transitionName={styles}>
      <div className={classes}>
        <div className={frontClass}>
          {card.get('front')}
        </div>
        <div className={backClass}>
          {card.get('back')}
        </div>
      </div>
    </CSSTransitionGroup>
  );
};

Card.propTypes = {
  card: ImmutablePropTypes.map.isRequired,
  showAnswer: PropTypes.bool.isRequired
};
 
export default connect( state => ({ 
  showAnswer: state.getIn(['cards', 'showAnswer'])
}))(Card);
