import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';

const initialState = {
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
      state.users = action.payload.data.users;
      state.pagesCount = action.payload.data.countPages;
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
