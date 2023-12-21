import React, { FC, useCallback, useMemo, useState } from 'react';
import VirtualizedTable from '../../component/virtualized-table';
import { useFilteredProjects } from '../../hooks/use-filtered-projects';
import FilterPanel from '../../component/filter-panel';
import { getFilterOptions } from '../../helpers/get-filter-options.helper';
import { getUniqueValue } from '../../helpers/get-unique-value.helper';
import { projectFields } from '../../constant/table-header.const';
import { useNextPage } from '../../hooks/use-next-page';
import { PAGES_LINKS } from '../../constant/links.const';
import type { OnChangeHandlerType } from '../../types/func.type';
import type { ProjectsFilterDataType } from '../../types/pages.type';

const ProjectsPage: FC = () => {
  const [filterData, setFilterData] = useState({
    page: 1
  } as ProjectsFilterDataType);
  const { projects, projectsStatus, pagesCount } =
    useFilteredProjects(filterData);
  const hasNextPage = useNextPage(pagesCount, filterData.page, projects);
  const { page, ...needDataFilter } = filterData;

  const filterOptions = useMemo(() => {
    if (projects.length === 0) {
      return {};
    }
    const options = getFilterOptions(projects, projectFields);
    const usersList = options?.usersList
      ?.flat()
      .map(({ username }) => username);
    return getUniqueValue({ ...options, usersList }) as Record<
      string,
      Array<string>
    >;
  }, [projects]);

  const handleChangeFilters = useCallback<OnChangeHandlerType>(
    (name, value) => {
      if (filterData[name as keyof ProjectsFilterDataType] !== value) {
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
        fields={projectFields}
      />
      <VirtualizedTable
        cellHeaderData={projectFields}
        cellBodyData={{
          cellData: projects,
          hasNextPage,
          status: projectsStatus,
          link: PAGES_LINKS.PROJECT,
          pagesCount,
          loadNextPage
        }}
      />
    </>
  );
};

export default ProjectsPage;
