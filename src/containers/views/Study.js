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
  setStudySessionAsContinuous,
  setStudySessionAsSpaced,
  googleUserAuthorizeStart,
  startAutosave,
  stopAutosave
} from '../../actions';

import UserAuthContainer from '../UserAuth';

import classNames from 'classnames/bind';
import styles from '../../styles/views/cardset.css';
const cx = classNames.bind(styles);

class StudyView extends Component {
  static propTypes = {
    fetchSet: PropTypes.func.isRequired,
    markCardCorrect: PropTypes.func.isRequired,
    markCardIncorrect: PropTypes.func.isRequired,
    startAutosave: PropTypes.func.isRequired,
    stopAutosave: PropTypes.func.isRequired,
    setStudySessionAsContinuous: PropTypes.func.isRequired,
    setStudySessionAsSpaced: PropTypes.func.isRequired,
    toggleAnswer: PropTypes.func.isRequired,
    getNextCard: PropTypes.func.isRequired,
    documentId: PropTypes.string.isRequired,
    fetchSetError: PropTypes.string,
    studyType: PropTypes.string.isRequired,
    activeCard: ImmutablePropTypes.map,
    setIsLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    this.props.fetchSet(this.props.documentId);
    this.props.startAutosave( );
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.setIsLoaded && nextProps.setIsLoaded) {
      this.props.getNextCard( );
    }
  }

  componentWillUnmount() {
    this.props.stopAutosave( );
  }

  onCorrect() {
    if( !this.props.activeCard ) 
      this.props.setStudySessionAsContinuous( );
    else if( this.props.studyType == "spaced" )
      this.props.markCardCorrect(this.props.activeCard.get('id'));

    this.props.getNextCard();
  }
  onIncorrect() {
    this.props.markCardIncorrect(this.props.activeCard.get('id'));
    this.props.getNextCard();
  }
  onToggle() {
    this.props.toggleAnswer( );
  }
  render( ) {
    const containerClass = cx('segment'.split(' '));
    let children;
    if(this.props.setIsLoaded) 
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
  documentId: prop.params.documentId,
  signInError: state.getIn(['auth', 'error']),
  fetchSetError: state.getIn(['set', 'error']),
  activeCard: state.getIn(['cards', 'data'])
    .get(state.getIn(['cards', 'activeIndex'])),
  setIsLoaded: state.getIn(['set', 'isLoaded']),
  studyType: state.getIn(['studySession', 'studyType'])
});

export default connect(mapStateToProps, {
  fetchSet,
  markCardCorrect,
  markCardIncorrect,
  startAutosave,
  getNextCard,
  stopAutosave,
  toggleAnswer,
  setStudySessionAsContinuous,
  setStudySessionAsSpaced
})(StudyView);
