import { Api } from './api.service';

export const UsersService = {
  getAllUsers: () => Api.get('user/all').then((response) => response.data)
};
