import { useEffect } from 'react';
import { stringify } from 'query-string';
import { getAllProjects } from '../store/thunks/projects.thunk';
import { useAppDispatch, useAppSelector } from '../types/hooks.type';
import type { UseFilteredProjectsType } from '../types/hooks.type';

export const useFilteredProjects: UseFilteredProjectsType = (filterData) => {
  const dispatch = useAppDispatch();

  const { projects, projectsStatus, pagesCount } = useAppSelector((state) => ({
    projects: state.projectsData.projects,
    pagesCount: state.projectsData.pagesCount,
    projectsStatus: state.projectsData.status
  }));

  useEffect(() => {
    if (projectsStatus === 'idle') {
      dispatch(getAllProjects());
    }
  }, [dispatch, projects, projectsStatus]);

  useEffect(() => {
    if (projectsStatus === 'success' && filterData) {
      const filterParams = stringify(filterData, {
        skipEmptyString: true,
        skipNull: true
      });
      const filterUrl = `?${filterParams}`;
      dispatch(getAllProjects(filterUrl));
    }
  }, [dispatch, filterData]);

  return { projects, projectsStatus, pagesCount };
};
