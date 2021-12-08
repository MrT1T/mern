import React, { FC } from 'react';
import Cell from '../_cell';
import type { Group, User } from '../../../types/store.type';

const CellGroup: FC<{ item: Group | User }> = ({ item }) => {
  if ('username' in item) {
    return (
      <>
        <Cell>{item.username}</Cell>
        <Cell>{item.firstName}</Cell>
        <Cell>{item.lastName}</Cell>
        <Cell>{item.email}</Cell>
        <Cell>{item.groupsList.map(({ name }) => name).join(', ')}</Cell>
      </>
    );
  }
  return (
    <>
      <Cell>{item?.name}</Cell>
      <Cell>{item?.title}</Cell>
      <Cell>{item?.usersList.map(({ username }) => username).join(', ')}</Cell>
    </>
  );
};

export default CellGroup;
