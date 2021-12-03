import { Api } from './api.service';
import { API_LINKS } from '../constant/links.const';
import type { GroupsPayloadData, Item } from '../types/store.type';
import type {
  GroupFetchType,
  GroupResponseType,
  UpdateGroupBodyType
} from '../types/services.type';
import type { StringObject } from '../types/objects.type';
import { linksHelper } from '../helpers/links.helper';

export const GroupsService = {
  getFilteredGroups: (query = ''): Promise<GroupsPayloadData> =>
    Api.get<GroupsPayloadData>(
      linksHelper(API_LINKS.FILTERED_GROUPS, query)
    ).then((response) => response.data),
  updateGroup: (body: UpdateGroupBodyType): Promise<void> =>
    Api.put(API_LINKS.UPDATE_GROUPS, body),
  getGroup: (groupname: string): Promise<GroupFetchType> =>
    Api.get<GroupResponseType>(linksHelper(API_LINKS.GROUP, groupname)).then(
      (response) => ({
        ...response.data,
        usersList: response.data.usersList.map(({ _id, username }) => ({
          name: username,
          value: _id
        }))
      })
    ),
  getGroups: (): Promise<Array<Item>> =>
    Api.get<Array<StringObject>>(API_LINKS.ALL_GROUPS).then((response) =>
      response.data.map(({ _id, name }) => ({ name, value: _id }))
    )
};
