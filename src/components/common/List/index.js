import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styleable from 'react-styleable';
import styles from './styles.css';

@styleable(styles, {allowMultiple: true})
export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    css: PropTypes.object.isRequired
  }
  render( ) {
    const classes = `${this.props.css.list} ${this.props.className||""}`;
    return <ul className={classes}>{this.props.children}</ul>;
  }
}
