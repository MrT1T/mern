import { Api } from './api.service';
import { API_LINKS } from '../constant/links.const';

export const GroupsService = {
  getFilteredGroups: (query = '') =>
    Api.get(API_LINKS.FILTERED_GROUPS(query)).then((response) => {
      response.data.groups = response.data.groups.map((group) => {
        group.usersList = group.usersList.map((user) => user.username);
        return group;
      });
      return response.data;
    }),
  updateGroup: (body) =>
    Api.put(API_LINKS.UPDATE_GROUPS, body).then((response) => response.data),
  getGroup: (groupname) =>
    Api.get(API_LINKS.GROUP(groupname)).then((response) => {
      response.data.usersList = response.data.usersList.map(
        ({ _id, username }) => ({ name: username, value: _id })
      );
      return response.data;
    }),
  getGroups: () =>
    Api.get(API_LINKS.ALL_GROUPS).then((response) =>
      response.data.map(({ _id, name }) => ({ name, value: _id }))
    )
};
