import { Api } from './api.service';

export const GroupsService = {
  getFilteredGroups: (query = '') =>
    Api.get(`group/filter/${query}`).then((response) => {
      response.data.groups = response.data.groups.map((group) => {
        group.usersList = group.usersList.map((user) => user.username);
        return group;
      });
      return response.data;
    }),
  updateGroup: (body) =>
    Api.put('group/update', body).then((response) => response.data),
  getGroup: (groupname) =>
    Api.get(`group/${groupname}`).then((response) => {
      response.data.usersList = response.data.usersList.map(
        ({ _id, username }) => ({ name: username, value: _id })
      );
      return response.data;
    }),
  getGroups: () =>
    Api.get('group/all').then((response) =>
      response.data.map(({ _id, name }) => ({ name, value: _id }))
    )
};
