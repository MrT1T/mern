import React from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { usersTableHeader } from '../../constant/table-header.const';
import { useAllUsers } from '../../hooks/use-all-users';

const UsersPage = () => {
  const users = useAllUsers();
  return (
    <VirtualizedTable cellBodyData={users} cellHeaderData={usersTableHeader} />
  );
};

export default UsersPage;
