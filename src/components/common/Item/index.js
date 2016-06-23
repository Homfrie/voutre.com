import React, { Component, PropTypes } from 'react';
import styleable from 'react-styleable';
import styles from './styles.css';

@styleable(styles)
export default class Item extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    css: PropTypes.object.isRequired
  }

  render( ) {
    const classes = `${this.props.css.item} ${this.props.className||""}`;
    return (
      <li className={classes}>
        {this.props.children}
      </li>
    );
  }
}
