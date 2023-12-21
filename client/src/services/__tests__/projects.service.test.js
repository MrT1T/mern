import { TEST } from '../../constant/variable.const';
import { API_LINKS } from '../../constant/links.const';
import { Api } from '../api.service';
import { projectsMock } from '../../mocks/projects.mock';
import { ProjectsService } from '../projects.service';

describe('Projects service tests', () => {
  it('Get filtered projects ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: { projects: projectsMock } });
    spyApi.mockImplementation(() => mockRequest);
    ProjectsService.getFilteredProjects(TEST);
    expect(spyApi).toBeCalledWith(`${API_LINKS.FILTERED_PROJECTS}${TEST}`);
  });
  it('Update project ', () => {
    const spyApi = jest.spyOn(Api, 'put');
    const mockRequest = Promise.resolve({ data: TEST });
    spyApi.mockImplementation(() => mockRequest);
    ProjectsService.updateProject(TEST);
    expect(spyApi).toBeCalledWith(API_LINKS.UPDATE_PROJECTS, TEST);
  });
  it('Get project ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: projectsMock[0] });
    spyApi.mockImplementation(() => mockRequest);
    ProjectsService.getProject(TEST);
    expect(spyApi).toBeCalledWith(`${API_LINKS.PROJECT}${TEST}`);
  });
  it('Get all projects ', () => {
    const spyApi = jest.spyOn(Api, 'get');
    const mockRequest = Promise.resolve({ data: projectsMock });
    spyApi.mockImplementation(() => mockRequest);
    ProjectsService.getProjects();
    expect(spyApi).toBeCalledWith(API_LINKS.ALL_PROJECTS);
  });
});
