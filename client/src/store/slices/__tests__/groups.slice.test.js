import groupsSlice, {
  initialState,
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../groups.slice';
import { STATUS } from '../../../constant/status.const';
import { groupsSliceData } from '../../../mocks/groups.mock';
import { ERROR_MESSAGES } from '../../../constant/errors.const';

describe('GroupsSlice tests', () => {
  it('GroupsSlice should return the initial state', () => {
    expect(groupsSlice(undefined, {})).toEqual(initialState);
  });
  it('Group status has been changed', () => {
    expect(groupsSlice(initialState, setGroupsStatus(STATUS.LOADING))).toEqual({
      ...initialState,
      status: STATUS.LOADING
    });
  });
  it('Groups reducer has been changed', () => {
    expect(
      groupsSlice(initialState, setGroupsSuccess({ ...groupsSliceData }))
    ).toEqual({
      groups: groupsSliceData.groups,
      pagesCount: groupsSliceData.countPages,
      status: STATUS.SUCCESS,
      error: null
    });
  });
  it('Groups reducer have error', () => {
    expect(
      groupsSlice(
        initialState,
        setGroupsError({ errorMessage: ERROR_MESSAGES.NO_GROUPS })
      ).error
    ).toEqual(ERROR_MESSAGES.NO_GROUPS);
  });
});
