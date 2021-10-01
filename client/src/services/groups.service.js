import { Api } from './api.service';

export const GroupsService = {
  getFilteredGroups: (query = '') =>
    Api.get(`group/filter/${query}`).then((response) => response.data),
  updateGroup: (body) =>
    Api.put('group/update', body).then((response) => response.data),
  getGroup: (groupname) =>
    Api.get(`group/${groupname}`).then((response) => response.data),
  getGroups: () =>
    Api.get('group/all').then((response) =>
      response.data.map(({ name }) => name)
    )
};
