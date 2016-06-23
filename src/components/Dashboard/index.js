import React, {Component, PropTypes} from 'react';
import styleable from 'react-styleable';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './styles.css';

@styleable(styles)
export default class Dashboard extends Component {
  static propTypes = {
    css: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  render( ) {
    return (
      <div className={this.props.css.wrapper}>
        {this.props.children}
      </div>
    );
  }
}
