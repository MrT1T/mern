import {
  setProjectsError,
  setProjectsStatus,
  setProjectsSuccess
} from '../slices/projects.slice';
import { ProjectsService } from '../../services/projects.service';
import { STATUS } from '../../constant/status.const';
import { ERROR_MESSAGES } from '../../constant/errors.const';
import type { AppDispatch, VoidThunk } from '../../types/store.type';

export const getAllProjects =
  (query?: string): VoidThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setProjectsStatus(STATUS.LOADING));
      const data = await ProjectsService.getFilteredProjects(query);
      dispatch(setProjectsSuccess({ ...data }));
    } catch (error) {
      dispatch(setProjectsError({ error: ERROR_MESSAGES.NO_PROJECTS }));
    }
  };
