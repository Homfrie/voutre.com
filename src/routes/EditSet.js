import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {fetchSet, saveCard, destroyCard, getNextCard} from '../actions';
import EditCard from '../components/Sets/Edit';

@connect(state => ({
  set: state.get('set')
}),{fetchSet, saveCard, destroyCard, getNextCard})
export default class EditSetRoute extends Component {
  static propTypes = {
    set: ImmutablePropTypes.map.isRequired,
    params: PropTypes.object.isRequired,
    fetchSet: PropTypes.func.isRequired,
    saveCard: PropTypes.func.isRequired,
    destroyCard: PropTypes.func.isRequired,
    getNextCard: PropTypes.func.isRequired
  }

  componentWillMount( ) {
    this.props.fetchSet(this.props.params.id, this.props.params.cardId);
  }
  onExit( ) {
  }
  onSave(e) {
    console.info(e);
    e.preventDefault( );
    const front = e.target.elements["card[front]"].value,
          back = e.target.elements["card[back]"].value,
          id = this.props.params.cardId,
          setId = this.props.params.id;

    this.props.saveCard({setId, id, front, back});
  }
  onNext(e) {
  }
  onDestroy(e) {
  }
  render( ) {
    const card = this.props.set.get('cards').get(this.props.set.get('activeIndex'));
    return (
      this.props.set.get('isLoaded') ? 
      (<EditCard onSave={this.onSave.bind(this)} 
          onNext={this.onNext.bind(this)}
          onDestroy={this.onDestroy.bind(this)}
          card={card}
          set={this.props.set} />) : null
    );
  }
}
