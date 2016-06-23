import React, { PropTypes, Component } from 'react';
import '../styles/global.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  componentWillMount() {
  }

  render( ) {
    return (<div>{this.props.children}</div>);
  }
}
