import { TEST } from '../../constant/variable.const';
import { API_LINKS } from '../../constant/links.const';
import { Api } from '../api.service';
import { groupsMock } from '../../mocks/groups.mock';
import { GroupsService } from '../groups.service';

describe('Groups service tests', () => {
  it('Get filtered groups ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: { groups: groupsMock } });
    spyApi.mockImplementation(() => mockRequest);
    GroupsService.getFilteredGroups(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.FILTERED_GROUPS(TEST));
  });
  it('Update group ', () => {
    const spyApi = jest.spyOn(Api, 'put');
    const mockRequest = Promise.resolve({ data: TEST });
    spyApi.mockImplementation(() => mockRequest);
    GroupsService.updateGroup(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.UPDATE_GROUPS, TEST);
  });
  it('Get group ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: groupsMock[0] });
    spyApi.mockImplementation(() => mockRequest);
    GroupsService.getGroup(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.GROUP(TEST));
  });
  it('Get all groups ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: groupsMock });
    spyApi.mockImplementation(() => mockRequest);
    GroupsService.getGroups();
    expect(spyApi).toBeCalledWith(API_LINKS.ALL_GROUPS);
  });
});
