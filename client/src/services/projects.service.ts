import { Api } from './api.service';
import { API_LINKS } from '../constant/links.const';
import type { ProjectsPayloadData, Item } from '../types/store.type';
import type {
  ProjectDataType,
  ProjectResponseType,
  UpdateProjectBodyType
} from '../types/services.type';
import { linksHelper } from '../helpers/links.helper';

export const ProjectsService = {
  getFilteredProjects: (query = ''): Promise<ProjectsPayloadData> =>
    Api.get<ProjectsPayloadData>(
      linksHelper(API_LINKS.FILTERED_PROJECTS, query)
    ).then((response) => response.data),
  updateProject: (body: UpdateProjectBodyType): Promise<void> =>
    Api.put(API_LINKS.UPDATE_PROJECTS, body),
  getProject: (projectname: string): Promise<ProjectDataType> =>
    Api.get<ProjectResponseType>(
      linksHelper(API_LINKS.PROJECT, projectname)
    ).then((response) => ({
      ...response.data,
      usersList: response.data.usersList.map(({ _id, username }) => ({
        name: username,
        value: _id
      }))
    })),
  getProjects: (): Promise<Array<Item>> =>
    Api.get<Array<Record<string, string>>>(API_LINKS.ALL_PROJECTS).then(
      (response) => response.data.map(({ _id, name }) => ({ name, value: _id }))
    )
};
