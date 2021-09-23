import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllGroups } from '../store/thunks/groups.thunk';

export const useAllGroups = () => {
  const dispatch = useDispatch();

  const { groups, groupsStatus } = useSelector((state) => ({
    groups: state.groupsData.groups,
    groupsStatus: state.groupsData.status
  }));

  useEffect(() => {
    if (groupsStatus === 'idle') {
      dispatch(getAllGroups());
    }
  }, [dispatch, groups, groupsStatus]);

  return groups;
};
