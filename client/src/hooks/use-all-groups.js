import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { stringify } from 'query-string';
import { getAllGroups } from '../store/thunks/groups.thunk';

export const useAllGroups = (filterData) => {
  const dispatch = useDispatch();

  const { groups, groupsStatus, pagesCount } = useSelector((state) => ({
    groups: state.groupsData.groups,
    pagesCount: state.groupsData.pagesCount,
    groupsStatus: state.groupsData.status
  }));

  useEffect(() => {
    if (groupsStatus === 'idle') {
      dispatch(getAllGroups());
    }
  }, [dispatch, groups, groupsStatus]);

  useEffect(() => {
    if (groupsStatus === 'success' && filterData) {
      const filterParams = stringify(filterData, {
        skipEmptyString: true,
        skipNull: true
      });
      const filterUrl = `?${filterParams}`;
      dispatch(getAllGroups(filterUrl));
    }
  }, [dispatch, filterData]);

  return { groups, groupsStatus, pagesCount };
};
