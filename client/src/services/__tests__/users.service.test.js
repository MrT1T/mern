import { TEST } from '../../constant/variable.const';
import { API_LINKS } from '../../constant/links.const';
import { Api } from '../api.service';
import { usersMock } from '../../mocks/users.mock';
import { UsersService } from '../users.service';

describe('Users service tests', () => {
  it('Get filtered users ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: { users: usersMock } });
    spyApi.mockImplementation(() => mockRequest);
    UsersService.getFilteredUsers(TEST);
    expect(spyApi).toBeCalledWith(`${API_LINKS.FILTERED_USERS}${TEST}`);
  });
  it('Update user ', () => {
    const spyApi = jest.spyOn(Api, 'put');
    const mockRequest = Promise.resolve({ data: TEST });
    spyApi.mockImplementation(() => mockRequest);
    UsersService.updateUser(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.UPDATE_USERS, TEST);
  });
  it('Get user ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: usersMock[0] });
    spyApi.mockImplementation(() => mockRequest);
    UsersService.getUser(TEST);
    expect(spyApi).toBeCalledWith(`${API_LINKS.USER}${TEST}`);
  });
  it('Get all users ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: usersMock });
    spyApi.mockImplementation(() => mockRequest);
    UsersService.getUsers();
    expect(spyApi).toBeCalledWith(API_LINKS.ALL_USERS);
  });
});
