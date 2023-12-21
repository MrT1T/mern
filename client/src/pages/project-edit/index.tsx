import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useProject } from '../../hooks/use-project';
import { PAGES_LINKS } from '../../constant/links.const';
import EditHeader from '../../component/edit-header';
import EditField from '../../component/edit-field';
import EditList from '../../component/edit-list';
import { firstLetterUpperCase } from '../../helpers/first-letter-upper-case.helper';
import { resetStore } from '../../store/thunks/reset-store.thunk';
import { ProjectsService } from '../../services/projects.service';
import { projectEditFields } from '../../constant/table-header.const';
import notificationCreator from '../../helpers/notification.helper';
import {
  validateData,
  validateProjectEdit
} from '../../helpers/validation.helper';
import { useAllUsers } from '../../hooks/use-all-users';
import SelectField from '../../component/select';
import NotFound from '../not-found';
import Loading from '../../component/loading';
import type {
  ProjectDataType,
  UpdateProjectBodyType
} from '../../types/services.type';
import type { Item } from '../../types/store.type';

const useStyles = makeStyles({
  editContainer: {
    display: 'flex',
    marginBottom: '30px'
  },
  editFields: {
    width: '330px'
  },
  selectFields: {
    width: '300px',
    margin: '30px 0 0 10px'
  }
});

const ProjectEditPage: FC = () => {
  const [projectData, setProjectData] = useState({} as ProjectDataType);
  const [errors, setErrors] = useState({} as Record<string, string | null>);
  const { projectname } = useParams<{ projectname: string }>();
  const { project, isLoading, error } = useProject(projectname);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useAllUsers();

  useEffect(() => {
    if (project) {
      setProjectData({ ...project } as ProjectDataType);
    }
  }, [project]);

  const usersField = useMemo(
    () =>
      users.filter(
        ({ name }) =>
          !projectData.usersList?.some((item) => item.name.includes(name))
      ),
    [projectData, users]
  );

  const handlerChangeProjectData = useCallback(
    (name, value) => {
      if (name === 'usersList') {
        value = projectData.usersList.filter((item) => item.value !== value);
      }

      if (name === 'addUser') {
        if (value) {
          name = 'usersList';
          const needUser = users.find((user) => user.value === value);
          value = projectData.usersList.concat(needUser as Item);
        }
      }

      setProjectData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));

      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    },
    [projectData]
  );

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handlerSaveProjectData = async () => {
    const { usersList, projectId, ...checkData } = projectData;
    const resultUserData = validateData(checkData, validateProjectEdit);

    if (resultUserData.isValid) {
      const body: UpdateProjectBodyType = {
        ...projectData,
        usersList: usersList.map(({ value }) => value),
        projectId
      };
      await ProjectsService.updateProject(body)
        .then(() => {
          notificationCreator.showOnSuccess('The project has been changed');
          dispatch(resetStore());
          return history.push(PAGES_LINKS.PROJECTS);
        })
        .catch(() => {
          notificationCreator.showOnFailure(
            'Project changes have not been saved'
          );
        });
    } else {
      setErrors(resultUserData.errors);
    }
  };

  const editTableFields = projectEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={projectData[item] as string}
      name={item}
      key={item}
      onChange={handlerChangeProjectData}
      error={errors[item]}
    />
  ));

  return (
    <>
      <EditHeader
        breadcrumbLabel="Project"
        breadcrumbLink={PAGES_LINKS.PROJECTS}
        pageName={project?.name}
        onClick={handlerSaveProjectData}
      />
      <Box data-testid="editContainer" className={classes.editContainer}>
        <Box className={classes.editFields}>
          <Typography
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Edit Fields
          </Typography>
          <SelectField
            name="addUser"
            options={usersField}
            placeholder="Add User"
            onChange={handlerChangeProjectData}
            className={classes.selectFields}
          />
          {editTableFields}
        </Box>
        <EditList
          list={projectData?.usersList}
          labelList="Users List"
          onChange={handlerChangeProjectData}
          name="usersList"
          buttonText="Delete user from project"
          link={PAGES_LINKS.PROFILE}
        />
      </Box>
    </>
  );
};

export default ProjectEditPage;
