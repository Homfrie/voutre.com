import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import {fetchGAPI} from '../../actions';
import classNames from 'classnames/bind';
import styles from '../../styles/layouts/app.css';
const cx = classNames.bind(styles);

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    fetchGAPI: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchGAPI( );
  }

  render( ) {
    const containerClass = cx({
      ui: true, 
      vertical: true, 
      center: true, 
      aligned: true, 
      segment: true
    });

    const containedClass = cx({
      ui: true,
      container: true
    });

    return (
      <div className={containerClass}>
        <div className={containedClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { };
};

export default connect(mapStateToProps, {
  fetchGAPI
})(AppLayout);
