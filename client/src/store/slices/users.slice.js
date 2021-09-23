/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersStatus: (state, action) => {
      state.status = action.payload;
    },
    setUsersSuccess: (state, action) => {
      state.users = action.payload.data;
      state.status = 'success';
    },
    setUsersError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errorMessage;
    }
  }
});

export const { setUsersStatus, setUsersSuccess, setUsersError } =
  usersSlice.actions;

export default usersSlice.reducer;
