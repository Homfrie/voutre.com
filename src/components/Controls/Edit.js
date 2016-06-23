import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {TransitionMotion, spring, Motion} from 'react-motion';
import styleable from 'react-styleable';

import Button from '../common/Button';
import Icon from '../common/Icon';

import styles from './styles.css';

@styleable(styles)
export default class EditControls extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    onDestroy: PropTypes.func,
    css: PropTypes.object.isRequired
  }
  render( ) {
    return (
      <div className={this.props.css["show-controls"]}>
        <Button className={this.props.css.marker}><Icon icon="slack"/></Button>
        <Button className={this.props.css.green} type="submit"><Icon icon="checkmark"/></Button>
        <Button className={this.props.css.blue} onClick={this.props.onNext}><Icon icon="checkmark"/></Button>
        <Button className={this.props.css.red} onClick={this.props.onDestroy}><Icon icon="remove"/></Button>
      </div>
    );
  }
}
