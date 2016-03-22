import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import List from './common/List';
import DocumentItem from './DocumentItem';

const DocumentList = ({data}) => {
  const documentItems = data.map(document =>
      <DocumentItem key={document.get('id')} data={document} />);

  const classes = ["documents"];
  return (
    <List className={classes}>
      {documentItems}
    </List>
  );
};

DocumentList.propTypes = {
  data: ImmutablePropTypes.list.isRequired
};

export default DocumentList;
