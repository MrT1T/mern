/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';

const initialState = {
  groups: [],
  pagesCount: null,
  status: STATUS.IDLE,
  error: null
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupsStatus: (state, action) => {
      state.status = action.payload;
    },
    setGroupsSuccess: (state, action) => {
      state.groups = action.payload.data.groups;
      state.pagesCount = action.payload.data.pagesCount;
      state.status = STATUS.SUCCESS;
    },
    setGroupsError: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.errorMessage;
    }
  }
});

export const { setGroupsStatus, setGroupsSuccess, setGroupsError } =
  groupsSlice.actions;

export default groupsSlice.reducer;
