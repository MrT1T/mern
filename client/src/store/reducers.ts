import usersReducer from './slices/users.slice';
import projectsSlice from './slices/projects.slice';

const reducers = {
  usersData: usersReducer,
  projectsData: projectsSlice
};

export default reducers;
