import { Api } from './api.service';
import { API_LINKS } from '../constant/links.const';
import type { Item, UsersPayloadData } from '../types/store.type';
import type {
  UpdateUserBodyType,
  UserFetchType,
  UserResponseType
} from '../types/services.type';
import type { StringObject } from '../types/objects.type';

export const UsersService = {
  getFilteredUsers: (query = ''): Promise<UsersPayloadData> =>
    Api.get<UsersPayloadData>(API_LINKS.FILTERED_USERS(query)).then(
      (response) => response.data
    ),
  updateUser: (body: UpdateUserBodyType): Promise<void> =>
    Api.put(API_LINKS.UPDATE_USERS, body),
  getUser: (username: string): Promise<UserFetchType> =>
    Api.get<UserResponseType>(API_LINKS.USER(username)).then((response) => ({
      ...response.data,
      groupsList: response.data.groupsList.map(({ _id, name }) => ({
        name,
        value: _id
      }))
    })),
  getUsers: (): Promise<Array<Item>> =>
    Api.get<Array<StringObject>>(API_LINKS.ALL_USERS).then((response) =>
      response.data.map(({ username, _id }) => ({
        name: username,
        value: _id
      }))
    )
};
