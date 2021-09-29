import { Api } from './api.service';

export const GroupsService = {
  getAllGroups: (query = '') =>
    Api.get(`group/all/${query}`).then((response) => response.data),
  updateGroup: (body) =>
    Api.put('group/update', body).then((response) => response.data),
  getGroup: (groupname) =>
    Api.get(`group/${groupname}`).then((response) => response.data)
};
