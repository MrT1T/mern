import { Api } from './api.service';
import { API_LINKS } from '../constant/links.const';

export const UsersService = {
  getFilteredUsers: (query = '') =>
    Api.get(API_LINKS.FILTERED_USERS(query)).then((response) => {
      response.data.users = response.data.users.map((user) => {
        user.groupsList = user.groupsList.map((group) => group.name);
        return user;
      });
      return response.data;
    }),
  updateUser: (body) =>
    Api.put(API_LINKS.UPDATE_USERS, body).then((response) => response.data),
  getUser: (username) =>
    Api.get(API_LINKS.USER(username)).then((response) => {
      response.data.groupsList = response.data.groupsList.map(
        ({ _id, name }) => ({ name, value: _id })
      );
      return response.data;
    }),
  getUsers: () =>
    Api.get(API_LINKS.ALL_USERS).then((response) =>
      response.data.map(({ username, _id }) => ({ name: username, value: _id }))
    )
};
