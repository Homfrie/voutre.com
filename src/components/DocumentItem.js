import React, { PropTypes } from 'react';
import Button from './common/Button';
import Item from './common/Item';

const DocumentItem = ({data, onClick}) => {
  return (
    <Item>
      <Button onClick={onClick}>{data.name}</Button>
    </Item>
  );
};

DocumentItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

export default DocumentItem;
