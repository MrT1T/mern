import projectsSlice, {
  initialState,
  setProjectsError,
  setProjectsStatus,
  setProjectsSuccess
} from '../projects.slice';
import { STATUS } from '../../../constant/status.const';
import { projectsSliceData } from '../../../mocks/projects.mock';
import { ERROR_MESSAGES } from '../../../constant/errors.const';

describe('ProjectsSlice tests', () => {
  it('ProjectsSlice should return the initial state', () => {
    expect(projectsSlice(undefined, {})).toEqual(initialState);
  });
  it('Project status has been changed', () => {
    expect(
      projectsSlice(initialState, setProjectsStatus(STATUS.LOADING))
    ).toEqual({
      ...initialState,
      status: STATUS.LOADING
    });
  });
  it('Projects reducer has been changed', () => {
    expect(
      projectsSlice(initialState, setProjectsSuccess({ ...projectsSliceData }))
    ).toEqual({
      projects: projectsSliceData.projects,
      pagesCount: projectsSliceData.pagesCount,
      status: STATUS.SUCCESS,
      error: null
    });
  });
  it('Projects reducer have error', () => {
    expect(
      projectsSlice(
        initialState,
        setProjectsError({ error: ERROR_MESSAGES.NO_PROJECTS })
      ).error
    ).toEqual(ERROR_MESSAGES.NO_PROJECTS);
  });
});
