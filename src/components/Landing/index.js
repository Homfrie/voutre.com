import React, {Component, PropTypes} from 'react';
import styleable from 'react-styleable';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './styles.css';
import Login from '../Auth/Login';

@styleable(styles)
export default class Landing extends Component {
  static propTypes = {
    css: PropTypes.object.isRequired
  }
  render( ) {
    return (
      <div className={this.props.css.wrapper}>
        <div className={this.props.css.header}>
          <div className={this.props.css.logo}>
            voutre 
          </div>
          <div className={this.props.css.leadin}>
            flashcards made easy 
          </div>
        </div>
        <Login/>
        <div className={this.props.css.help}>
          <Link to="/tutorial">How does it work?</Link>
        </div>
      </div>
    );
  }
}
