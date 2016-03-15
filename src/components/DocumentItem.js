import React, { PropTypes } from 'react';
import Button from './common/Button';
import Item from './common/Item';
import {Link} from 'react-router';

const DocumentItem = ({data, onClick}) => {
  const link = `/sets/${data.get('id')}`;
  return (
    <Item>
      <Link to={link}>{data.get('name')}</Link>
    </Item>
  );
};

DocumentItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

export default DocumentItem;
