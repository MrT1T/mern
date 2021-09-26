import React, { useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { usersFields } from '../../constant/table-header.const';
import { useAllUsers } from '../../hooks/use-all-users';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import FilterPanel from '../../component/filter-panel';

const UsersPage = () => {
  const [filterData, setFilterData] = useState({ page: 1 });
  const [hasNextPage, setHasNextPage] = useState(false);
  const { users, usersStatus, pagesCount } = useAllUsers(filterData);

  let filterOptions = getFilterOptions(users);

  if (filterOptions.length !== 0) {
    filterOptions = getUniqueValue(filterOptions);
  }

  const handleChangeFilters = (name, value) => {
    setFilterData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const loadNextPage = () => {
    setHasNextPage(pagesCount > filterData.page);
    if (hasNextPage) {
      handleChangeFilters('page', filterData.page + 1);
    }
  };

  return (
    <>
      <FilterPanel
        filterOptions={filterOptions}
        filterData={filterData}
        onChange={handleChangeFilters}
        fields={usersFields}
      />
      <VirtualizedTable
        cellBodyData={users}
        cellHeaderData={usersFields}
        loadNextPage={loadNextPage}
        hasNextPage={hasNextPage}
        status={usersStatus}
      />
    </>
  );
};

export default UsersPage;
