import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import {fetchGAPI} from '../../actions';
import classNames from 'classnames/bind';
import styles from '../../styles/layouts/app.css';
const cx = classNames.bind(styles);

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    fetchGAPI: PropTypes.func.isRequired,
    isGAPILoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if(!this.props.isGAPILoaded)
      this.props.fetchGAPI( );
  }

  render( ) {
    const classes = cx('segment'.split(' '));
    const children = this.props.isGAPILoaded ? 
      this.props.children : <div>Loading</div>;
    //const children = this.props.children;

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  isGAPILoaded: state.getIn(['gapi', 'isLoaded'])
});

export default connect(mapStateToProps, {
  fetchGAPI
})(AppLayout);
