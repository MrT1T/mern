import React, { FC, useCallback, useMemo, useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { usersFields } from '../../constant/table-header.const';
import { useFilteredUsers } from '../../hooks/use-filtered-users';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import FilterPanel from '../../component/filter-panel';
import { useNextPage } from '../../hooks/use-next-page';
import { PAGES_LINKS } from '../../constant/links.const';
import type { OnChangeHandlerType } from '../../types/func.type';
import type { UsersFilterDataType } from '../../types/pages.type';

const UsersPage: FC = () => {
  const [filterData, setFilterData] = useState({
    page: 1
  } as UsersFilterDataType);
  const { users, usersStatus, pagesCount } = useFilteredUsers(filterData);
  const hasNextPage = useNextPage(pagesCount, filterData.page, users);
  const { page, ...needDataFilter } = filterData;

  const filterOptions = useMemo(() => {
    if (users.length === 0) {
      return {};
    }
    const options = getFilterOptions(users, usersFields);
    const groupsList = options?.groupsList?.flat().map(({ name }) => name);
    return getUniqueValue({ ...options, groupsList }) as Record<
      string,
      Array<string>
    >;
  }, [users]);

  const handleChangeFilters = useCallback<OnChangeHandlerType>(
    (name, value) => {
      if (filterData[name as keyof UsersFilterDataType] !== value) {
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
