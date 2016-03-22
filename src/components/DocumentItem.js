import React, { PropTypes } from 'react';
import Button from './common/Button';
import Item from './common/Item';
import {Link} from 'react-router';

const DocumentItem = ({data}) => {
  const link = `/sets/${data.get('id')}`;
  const classes = ['document'];
  return (
    <Item className={classes}>
      <Link to={link}>{data.get('name')}</Link>
    </Item>
  );
};

DocumentItem.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default DocumentItem;
