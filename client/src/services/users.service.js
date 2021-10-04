import { Api } from './api.service';

export const UsersService = {
  getFilteredUsers: (query = '') =>
    Api.get(`user/filter/${query}`).then((response) => {
      response.data.users = response.data.users.map((user) => {
        user.groupsList = user.groupsList.map((group) => group.name);
        return user;
      });
      return response.data;
    }),
  updateUser: (body) =>
    Api.put('user/update', body).then((response) => response.data),
  getUser: (username) =>
    Api.get(`user/${username}`).then((response) => {
      response.data.groupsList = response.data.groupsList.map(
        ({ _id, name }) => ({ name, value: _id })
      );
      return response.data;
    }),
  getUsers: () =>
    Api.get('user/all').then((response) =>
      response.data.map(({ username, _id }) => ({ name: username, value: _id }))
    )
};
