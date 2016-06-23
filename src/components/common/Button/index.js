import React, { PropTypes, Component } from 'react';
import stringToCssModule from '../../../lib/string-to-css-module';
import styles from './styles.css';
import styleable from 'react-styleable';

@styleable(styles)
export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    css: PropTypes.object.isRequired,
    onClick: PropTypes.func
  }
  render( ) {
    const classes = `${this.props.css.button} ${stringToCssModule(this.props.className, this.props.css)}`;
    return <button onClick={this.props.onClick} className={classes}>{this.props.children}</button>;
  }
}
