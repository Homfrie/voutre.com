import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {TransitionMotion, spring, Motion} from 'react-motion';
import styleable from 'react-styleable';

import Button from '../common/Button';
import Icon from '../common/Icon';

import styles from './styles.css';

@styleable(styles)
export default class SetControls extends Component {
  static propTypes = {
    onCorrect: PropTypes.func.isRequired,
    onIncorrect: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    css: PropTypes.object.isRequired
  }
  render( ) {
    return (
      <div className={this.props.css.showControls}>
        <Button className={this.props.css.market}><Icon icon="slack"/></Button>
        <Button className={this.props.css.correct}  onClick={this.props.onIncorrect}><Icon icon="remove"/></Button>
        <Button className={this.props.css.incorrect}  onClick={this.props.onToggle}><Icon icon="undo"/></Button>
        <Button className={this.props.css.flip} onClick={this.props.onCorrect}><Icon icon="checkmark"/></Button>
      </div>
    );
  }
}
