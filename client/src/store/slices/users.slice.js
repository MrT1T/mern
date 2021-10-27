import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';

export const initialState = {
  users: [],
  pagesCount: null,
  status: STATUS.IDLE,
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
      state.users = action.payload.users;
      state.pagesCount = action.payload.countPages;
      state.status = STATUS.SUCCESS;
    },
    setUsersError: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.errorMessage;
    }
  }
});

export const { setUsersStatus, setUsersSuccess, setUsersError } =
  usersSlice.actions;

export default usersSlice.reducer;
