import React, { PropTypes } from 'react';
import GoogleClient from '../lib/google-client';
import List from './common/List';
import DocumentItem from './DocumentItem';

const DocumentList = ({data, onSelect}) => {
  const documentItems = data.map(document => {
    return (
      <DocumentItem key={document.id} onClick={onSelect} data={document} />
    );
  });
  return (
    <List>
    {documentItems}
    </List>
  );
};

DocumentList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default DocumentList;
