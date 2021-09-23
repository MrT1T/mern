import React from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { groupTableHeader } from '../../constant/table-header.const';
import { useAllGroups } from '../../hooks/use-all-groups';

const GroupsPage = () => {
  const groups = useAllGroups();
  return (
    <VirtualizedTable cellHeaderData={groupTableHeader} cellBodyData={groups} />
  );
};

export default GroupsPage;
