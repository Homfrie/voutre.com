import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import Card from '../../components/Card';
import SetControls from '../../components/SetControls';

import {
  toggleAnswer,
  fetchSet, 
  markCardCorrect, 
  markCardIncorrect, 
  getNextCard, 
  googleUserAuthorizeStart
} from '../../actions';

import UserAuthContainer from '../UserAuth';

import classNames from 'classnames/bind';
import styles from '../../styles/views/cardset.css';
const cx = classNames.bind(styles);

//TODO refactor auth login out of this and into router
class CardSetView extends Component {
  static propTypes = {
    fetchSet: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    markCardCorrect: PropTypes.func.isRequired,
    markCardIncorrect: PropTypes.func.isRequired,
    toggleAnswer: PropTypes.func.isRequired,
    getNextCard: PropTypes.func.isRequired,
    documentId: PropTypes.string.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    signInError: PropTypes.string,
    fetchSetError: PropTypes.string,
    activeCard: ImmutablePropTypes.map,
    setIsLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if(this.props.isSignedIn)
      this.props.fetchSet(this.props.documentId);
    else
      this.props.login(true);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isSignedIn != nextProps.isSignedIn &&
       !nextProps.setIsLoaded && !nextProps.fetchSetError)
      this.props.fetchSet(this.props.documentId);
  }

  onCorrect() {
    this.props.markCardCorrect(this.props.activeCard);
    this.props.getNextCard();
  }
  onIncorrect() {
    this.props.markCardIncorrect(this.props.activeCard);
    this.props.getNextCard();
  }
  onToggle() {
    this.props.toggleAnswer( );
  }
  render( ) {
    const containerClass = cx('segment'.split(' '));
    let children;
    if(!this.props.isSignedIn && this.props.signInError)
      children = <UserAuthContainer/>;
    else if(this.props.setIsLoaded) 
      children = (
        <div className={containerClass}>
          <Card key={this.props.activeCard.get('id')} card={this.props.activeCard}/>
          <SetControls onCorrect={this.onCorrect.bind(this)}
                       onToggle ={this.onToggle.bind(this)}
                       onIncorrect={this.onIncorrect.bind(this)}/>
        </div>
      );

    return (
      <div className={containerClass}>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state, prop) => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn']),
  documentId: prop.params.documentId,
  signInError: state.getIn(['auth', 'error']),
  fetchSetError: state.getIn(['set', 'error']),
  activeCard: state.getIn(['cards', 'data'])
    .get(state.getIn(['cards', 'activeIndex'])),
  setIsLoaded: state.getIn(['set', 'isLoaded'])
});

export default connect(mapStateToProps, {
  fetchSet,
  markCardCorrect,
  markCardIncorrect,
  getNextCard,
  toggleAnswer,
  login: googleUserAuthorizeStart
})(CardSetView);
