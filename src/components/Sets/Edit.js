import React, {Component, PropTypes} from 'react';
import styleable from 'react-styleable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './styles.css';
import ReactQuill from 'react-quill';
import Input from '../common/Input';
import Button from '../common/Button';
import Controls from '../Controls/Edit';

@styleable(styles)
export default class EditSet extends Component {
  static propTypes = {
    set: ImmutablePropTypes.map.isRequired,
    card: ImmutablePropTypes.map,
    css: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
  }
  render( ) {
    const front = this.props.card ? this.props.card.get('front') : "";
    const back = this.props.card ? this.props.card.get('back') : "";
    const setName = this.props.set.get('name');
    return (
      <div className={this.props.css.wrapper}>
        <div className={this.props.css['meta-wrapper']}>
          Editing
          <ReactQuill 
            toolbar={false} 
            defaultValue={setName}>
              <div key="editor"
                ref="editor"
                autoCorrect={false}
                className="set-name"/>
          </ReactQuill>
          <Button className="orange beveled">Study</Button>
          <Button className="pink beveled">Cards</Button>
        </div>
        <div className={this.props.css['card-wrapper']}>
          <form onSubmit={this.props.onSave}>
            <Input name="card[front]" defaultValue={front} className={this.props.css.front} placeholder="Front of the card"/>
            <Input name="card[back]" defaultValue={back} className={this.props.css.back} placeholder="Back of the card"/>

            <Controls onNext={this.props.onNext} onExit={this.props.onExit} />
          </form>
        </div>
      </div>
    );
  }
}
