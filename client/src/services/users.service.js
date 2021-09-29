import { Api } from './api.service';

export const UsersService = {
  getAllUsers: (query = '') =>
    Api.get(`user/all/${query}`).then((response) => response.data),
  updateUser: (body) =>
    Api.put('user/update', body).then((response) => response.data),
  getUser: (username) =>
    Api.get(`user/${username}`).then((response) => response.data)
};
