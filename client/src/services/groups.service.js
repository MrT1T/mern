import { Api } from './api.service';

export const GroupsService = {
  getAllGroups: () => Api.get('group/all').then((response) => response.data)
};
