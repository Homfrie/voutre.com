import React, { PropTypes, Component } from 'react';
import styleable from 'react-styleable';
import styles from './styles.css';

@styleable(styles)
export default class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    css: PropTypes.object.isRequired
  }
  render( ) {
    const classes = `${this.props.css.icon} ${this.props.css[this.props.icon]}`;
    return <i className={classes}></i>;
  }
}
