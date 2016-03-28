import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import classNames from 'classnames/bind';
import styles from '../../styles/layouts/app.css';
const cx = classNames.bind(styles);

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  componentWillMount() {
  }

  render( ) {
    const classes = cx('segment'.split(' '));

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
});

export default connect(mapStateToProps, {
})(AppLayout);
