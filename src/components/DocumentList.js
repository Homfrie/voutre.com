import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GoogleClient from '../lib/google-client';
import List from './common/List';
import DocumentItem from './DocumentItem';

const DocumentList = ({data, onSelect}) => {
  const documentItems = data.map(document =>
      <DocumentItem key={document.get('id')} onClick={onSelect} data={document} />);

  return (
    <List>
      {documentItems}
    </List>
  );
};

DocumentList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: ImmutablePropTypes.list.isRequired
};

export default DocumentList;
