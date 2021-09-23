import usersReducer from './slices/users.slice';
import groupsSlice from './slices/groups.slice';

const reducers = {
  usersData: usersReducer,
  groupsData: groupsSlice
};

export default reducers;
