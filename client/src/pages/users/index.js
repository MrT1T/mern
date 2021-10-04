import React, { useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { usersFields } from '../../constant/table-header.const';
import { useFilteredUsers } from '../../hooks/use-filtered-users';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import FilterPanel from '../../component/filter-panel';
import { useNextPage } from '../../hooks/use-next-page';
import { PAGES_LINKS } from '../../constant/links.const';

const UsersPage = () => {
  const [filterData, setFilterData] = useState({ page: 1 });
  const { users, usersStatus, pagesCount } = useFilteredUsers(filterData);
  const hasNextPage = useNextPage(pagesCount, filterData.page, users);

  let filterOptions = getFilterOptions(users);

  if (filterOptions.length !== 0) {
    filterOptions = getUniqueValue(filterOptions);
  }

  const handleChangeFilters = (name, value) => {
    setFilterData((prevValues) => ({ ...prevValues, [name]: value, page: 1 }));
  };

  const loadNextPage = () => {
    if (pagesCount > filterData.page) {
      setFilterData((prevValues) => ({
        ...prevValues,
        page: filterData.page + 1
      }));
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
        cellBodyData={{
          cellData: users,
          hasNextPage,
          status: usersStatus,
          link: PAGES_LINKS.PROFILE,
          pagesCount,
          loadNextPage
        }}
        cellHeaderData={usersFields}
      />
    </>
  );
};

export default UsersPage;
