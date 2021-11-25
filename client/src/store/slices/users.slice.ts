import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';
import type {
  ErrorPayload,
  UsersPayloadData,
  UsersSliceType
} from '../../types/store.type';

export const initialState: UsersSliceType = {
  users: [],
  pagesCount: null,
  status: STATUS.IDLE,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersStatus: (state, action: PayloadAction<STATUS>) => {
      state.status = action.payload;
    },
    setUsersSuccess: (state, action: PayloadAction<UsersPayloadData>) => {
      state.users = action.payload.users;
      state.pagesCount = action.payload.pagesCount;
      state.status = STATUS.SUCCESS;
    },
    setUsersError: (state, action: PayloadAction<ErrorPayload>) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.error;
    }
  }
});

export const { setUsersStatus, setUsersSuccess, setUsersError } =
  usersSlice.actions;

export default usersSlice.reducer;
