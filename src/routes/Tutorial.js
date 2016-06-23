import React, {Component, PropTypes} from 'react';

export default class Tutorial extends Component {
  render( ) { return <div></div>; }
}
/*
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import DocumentSearch from '../components/DocumentSearch';
import Card from '../components/Card';
import SetControls from '../components/SetControls';
import Login from '../components/Auth/Login';
import TutorialData from '../lib/tutorial-data.json';

import {
  toggleAnswer,
  markCardCorrect, 
  markCardIncorrect, 
  getNextCard, 
  updateSet, 
} from '../actions';


@connect((state, prop) => ({
  isSignedIn: state.getIn(['auth', 'isSignedIn']),
  signInError: state.getIn(['auth', 'error']),
  activeCard: ~state.getIn(['cards', 'activeIndex']) ? 
    state.getIn(['cards', 'data'])
  .get(state.getIn(['cards', 'activeIndex'])) : null,
  setIsLoaded: state.getIn(['set', 'isLoaded'])
}), {
  markCardCorrect,
  markCardIncorrect,
  getNextCard,
  toggleAnswer,
  updateSet
})
export default class Tutorial extends Component {
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
    return (
      <div>
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
             <div>
              <p>That's it! Get started now by signing-in and select a Doc to begin studying.</p>
                  <Login/>
              </div>
           );
       })()}
      </div>
    );
  }
}
*/
