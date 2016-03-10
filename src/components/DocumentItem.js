import React, { PropTypes } from 'react';
import Button from './common/Button';
import Item from './common/Item';

const DocumentItem = ({data, onClick}) => {
  return (
    <Item>
      <Button data-id={data.get('id')} onClick={onClick}>{data.get('name')}</Button>
    </Item>
  );
};

DocumentItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

export default DocumentItem;
