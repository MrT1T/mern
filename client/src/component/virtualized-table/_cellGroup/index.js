import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../_cell';

const CellGroup = ({ item }) => {
  if (item.username) {
    return (
      <>
        <Cell>{item.username}</Cell>
        <Cell>{item.firstName}</Cell>
        <Cell>{item.lastName}</Cell>
        <Cell>{item.email}</Cell>
        <Cell>{item.groupsList.join(', ')}</Cell>
      </>
    );
  }
  return (
    <>
      <Cell>{item.name}</Cell>
      <Cell>{item.title}</Cell>
      <Cell>{item.usersList.join(', ')}</Cell>
    </>
  );
};

export default CellGroup;

CellGroup.propTypes = {
  item: PropTypes.object
};
