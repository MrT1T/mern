import React, { useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { useAllGroups } from '../../hooks/use-all-groups';
import FilterPanel from '../../component/filter-panel';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import { groupFields } from '../../constant/table-header.const';
import { useNextPage } from '../../hooks/use-next-page';
import { PAGES_LINKS } from '../../constant/links.const';

const GroupsPage = () => {
  const [filterData, setFilterData] = useState({ page: 1 });
  const { groups, groupsStatus, pagesCount } = useAllGroups(filterData);
  const hasNextPage = useNextPage(pagesCount, filterData.page, groups);

  let filterOptions = getFilterOptions(groups);

  if (filterOptions.length !== 0) {
    filterOptions = getUniqueValue(filterOptions);
  }

  const handleChangeFilters = (name, value) => {
    setFilterData((prevValues) => ({ ...prevValues, [name]: value, page: 1 }));
  };

  const loadNextPage = () => {
    if (pagesCount !== filterData.page) {
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
        fields={groupFields}
      />
      <VirtualizedTable
        cellHeaderData={groupFields}
        cellBodyData={{
          cellData: groups,
          hasNextPage,
          status: groupsStatus,
          link: PAGES_LINKS.GROUP,
          pagesCount,
          loadNextPage
        }}
      />
    </>
  );
};

export default GroupsPage;
