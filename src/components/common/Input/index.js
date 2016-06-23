import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';
import styles from './styles.css';
import styleable from 'react-styleable';

@styleable(styles)
export default class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    css: PropTypes.object.isRequired
  }
  render( ) {
    const classes = `${this.props.css.input} ${this.props.className || ""}`;
    const inputElem = typeof this.props.onChange === "function" ?
      <DebounceInput
        placeholder={this.props.placeholder}
        minLength={2}
        type={this.props.type}
        name={this.props.name}
        forceNotifyOnBlur={false}
        forceNotifyByEnter={false}
        className={classes}
        debounceTimeout={300}
        value={this.props.value}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange} /> :
      <input className={classes} 
             name={this.props.name}
             defaultValue={this.props.defaultValue}
             value={this.props.value}
             type={this.props.type} placeholder={this.props.placeholder} />;

    return (inputElem);
  }
}
