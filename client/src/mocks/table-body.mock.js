import { PAGES_LINKS } from '../constant/links.const';
import { usersMock } from './users.mock';
import { STATUS } from '../constant/status.const';
import { groupsMock } from './groups.mock';

const link = PAGES_LINKS.PROFILE;

export const cellBodyMock = {
  loadNextPage: () => {},
  status: STATUS.SUCCESS,
  hasNextPage: true,
  pagesCount: 2,
  cellData: usersMock,
  link
};

export const rowUsersMock = {
  cellData: usersMock,
  isItemLoaded: () => true,
  pagesCount: 2,
  link
};
export const rowGroupsMock = {
  cellData: groupsMock,
  isItemLoaded: () => true,
  pagesCount: 2,
  link: PAGES_LINKS.GROUP
};

export const rowEmptyMock = {
  cellData: [],
  isItemLoaded: () => {},
  pagesCount: 0,
  link
};

export const rowLoadMock = {
  cellData: [],
  isItemLoaded: () => false,
  pagesCount: 2,
  link
};
