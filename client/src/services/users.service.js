import { Api } from './api.service';

export const UsersService = {
  getFilteredUsers: (query = '') =>
    Api.get(`user/filter/${query}`).then((response) => response.data),
  updateUser: (body) =>
    Api.put('user/update', body).then((response) => response.data),
  getUser: (username) =>
    Api.get(`user/${username}`).then((response) => response.data),
  getUsers: () =>
    Api.get('user/all').then((response) =>
      response.data.map(({ username }) => username)
    )
};
