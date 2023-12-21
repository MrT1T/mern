import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';
import type {
  ErrorPayload,
  ProjectsPayloadData,
  ProjectsSliceType
} from '../../types/store.type';

export const initialState: ProjectsSliceType = {
  projects: [],
  pagesCount: null,
  status: STATUS.IDLE,
  error: null
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsStatus: (state, action: PayloadAction<STATUS>) => {
      state.status = action.payload;
    },
    setProjectsSuccess: (state, action: PayloadAction<ProjectsPayloadData>) => {
      state.projects = action.payload.projects;
      state.pagesCount = action.payload.pagesCount;
      state.status = STATUS.SUCCESS;
    },
    setProjectsError: (state, action: PayloadAction<ErrorPayload>) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.error;
    }
  }
});

export const { setProjectsStatus, setProjectsSuccess, setProjectsError } =
  projectsSlice.actions;

export default projectsSlice.reducer;
