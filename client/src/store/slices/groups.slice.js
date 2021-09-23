/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
  status: 'idle',
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
      state.groups = action.payload.data;
      state.status = 'success';
    },
    setGroupsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errorMessage;
    }
  }
});

export const { setGroupsStatus, setGroupsSuccess, setGroupsError } =
  groupsSlice.actions;

export default groupsSlice.reducer;
