import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import DocumentSearchContainer from '../DocumentSearch';
import Card from '../../components/Card';
import SetControls from '../../components/SetControls';
import TutorialData from '../../lib/tutorial-data.json';

import {
  toggleAnswer,
  markCardCorrect, 
  markCardIncorrect, 
  getNextCard, 
  updateSet, 
  googleUserAuthorizeStart
} from '../../actions';

import UserAuthContainer from '../UserAuth';

import classNames from 'classnames/bind';
import styles from '../../styles/views/cardset.css';
const cx = classNames.bind(styles);

//TODO refactor auth login out of this and into router
class TutorialView extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    markCardCorrect: PropTypes.func.isRequired,
    markCardIncorrect: PropTypes.func.isRequired,
    toggleAnswer: PropTypes.func.isRequired,
    getNextCard: PropTypes.func.isRequired,
    updateSet: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    signInError: PropTypes.string,
    fetchSetError: PropTypes.string,
    activeCard: ImmutablePropTypes.map,
    setIsLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    this.props.updateSet(TutorialData);
  }

  componentWillReceiveProps(nextProps) {
  }

  onCorrect() {
    if( this.props.activeCard ) {
      this.props.markCardCorrect(this.props.activeCard.get('id')); 
      this.props.getNextCard();
    }
  }
  onIncorrect() {
    if( this.props.activeCard ) {
      this.props.markCardIncorrect(this.props.activeCard.get('id'));
      this.props.getNextCard();
    }
  }
  onToggle() {
    this.props.toggleAnswer( );
  }
  render( ) {
    const containerClass = cx('segment'),
          finishedClass = cx('finished');

    return (
      <div className={containerClass}>
       {(() => {
         if(this.props.activeCard)
           return(
              <div>
                <Card key={this.props.activeCard.get('id')} card={this.props.activeCard}/>
                <SetControls onCorrect={this.onCorrect.bind(this)}
                             onToggle={this.onToggle.bind(this)}
                             onIncorrect={this.onIncorrect.bind(this)}/>;
              </div>
          );
         else
           return (
             <div className={finishedClass}>
              <p>That's it! Get started now by signing-in and select a Doc to begin studying.</p>
              {
                this.props.isSignedIn ? 
                  <DocumentSearchContainer /> : 
                  <UserAuthContainer/>
              }
              </div>
           );
       })()}
      </div>
    );
  }
}

const mapStateToProps = (state, prop) => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn']),
  signInError: state.getIn(['auth', 'error']),
  activeCard: ~state.getIn(['cards', 'activeIndex']) ? 
    state.getIn(['cards', 'data'])
            .get(state.getIn(['cards', 'activeIndex'])) : null,
  setIsLoaded: state.getIn(['set', 'isLoaded'])
});

export default connect(mapStateToProps, {
  markCardCorrect,
  markCardIncorrect,
  getNextCard,
  toggleAnswer,
  updateSet,
  login: googleUserAuthorizeStart
})(TutorialView);
