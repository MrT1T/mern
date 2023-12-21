import { PAGES_LINKS } from '../constant/links.const';
import { usersMock } from './users.mock';
import { STATUS } from '../constant/status.const';
import { projectsMock } from './projects.mock';

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
export const rowProjectsMock = {
  cellData: projectsMock,
  isItemLoaded: () => true,
  pagesCount: 2,
  link: PAGES_LINKS.PROJECT
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
