import React, {Component, PropTypes} from 'react';
import styleable from 'react-styleable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './styles.css';
import Input from '../common/Input';
import Item from '../common/Item';
import Button from '../common/Button';
import List from '../common/List';

@styleable(styles)
export default class Search extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onCreateSet: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    data: ImmutablePropTypes.list.isRequired,
    css: PropTypes.object.isRequired
  }
  render( ) {
    const items = this.props.data.map(d => {
      const link = `/sets/${d.get('id')}`;
      <Item key={d.get('id')}>
        <Link to={link}>{d.get('name')}</Link>
      </Item>;
    });

    const createButton = 
      this.props.query != "" ? <Item><Button onClick={this.props.onCreateSet}>Create a <strong>{this.props.query}</strong> set!</Button></Item> : null;

    return (
      <div>
        <Input placeholder="What would you like to learn today, friendo?" className={this.props.css["search-input"]} onChange={this.props.onSearch}/>
        <List>
          {createButton}
          {items}
        </List>
      </div>
    );
  }
}
