import React, { FC, useCallback, useMemo, useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { useFilteredGroups } from '../../hooks/use-filtered-groups';
import FilterPanel from '../../component/filter-panel';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import { groupFields } from '../../constant/table-header.const';
import { useNextPage } from '../../hooks/use-next-page';
import { PAGES_LINKS } from '../../constant/links.const';
import type { OnChangeHandlerType } from '../../types/func.type';
import type { GroupsFilterDataType } from '../../types/pages.type';

const GroupsPage: FC = () => {
  const [filterData, setFilterData] = useState({
    page: 1
  } as GroupsFilterDataType);
  const { groups, groupsStatus, pagesCount } = useFilteredGroups(filterData);
  const hasNextPage = useNextPage(pagesCount, filterData.page, groups);
  const { page, ...needDataFilter } = filterData;

  const filterOptions = useMemo(() => {
    if (groups.length === 0) {
      return {};
    }
    const options = getFilterOptions(groups, groupFields);
    const usersList = options?.usersList
      ?.flat()
      .map(({ username }) => username);
    return getUniqueValue({ ...options, usersList }) as Record<
      string,
      Array<string>
    >;
  }, [groups]);

  const handleChangeFilters = useCallback<OnChangeHandlerType>(
    (name, value) => {
      if (filterData[name as keyof GroupsFilterDataType] !== value) {
        setFilterData((prevValues) => ({
          ...prevValues,
          [name]: value,
          page: 1
        }));
      }
    },
    [filterData]
  );

  const loadNextPage = () => {
    if (pagesCount !== page) {
      setFilterData((prevValues) => ({
        ...prevValues,
        page: page + 1
      }));
    }
  };

  return (
    <>
      <FilterPanel
        filterOptions={filterOptions}
        filterData={needDataFilter as Record<string, string | undefined>}
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
