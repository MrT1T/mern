import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '../../constant/status.const';
import type {
  ErrorPayload,
  GroupsPayloadData,
  GroupsSliceType
} from '../../types/store.type';

export const initialState: GroupsSliceType = {
  groups: [],
  pagesCount: null,
  status: STATUS.IDLE,
  error: null
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroupsStatus: (state, action: PayloadAction<STATUS>) => {
      state.status = action.payload;
    },
    setGroupsSuccess: (state, action: PayloadAction<GroupsPayloadData>) => {
      state.groups = action.payload.groups;
      state.pagesCount = action.payload.pagesCount;
      state.status = STATUS.SUCCESS;
    },
    setGroupsError: (state, action: PayloadAction<ErrorPayload>) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.error;
    }
  }
});

export const { setGroupsStatus, setGroupsSuccess, setGroupsError } =
  groupsSlice.actions;

export default groupsSlice.reducer;
