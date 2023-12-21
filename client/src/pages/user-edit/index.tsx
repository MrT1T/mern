import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditHeader from '../../component/edit-header';
import { PAGES_LINKS } from '../../constant/links.const';
import EditField from '../../component/edit-field';
import EditList from '../../component/edit-list';
import { useUser } from '../../hooks/use-user';
import { firstLetterUpperCase } from '../../helpers/first-letter-upper-case.helper';
import { resetStore } from '../../store/thunks/reset-store.thunk';
import { UsersService } from '../../services/users.service';
import { usersEditFields } from '../../constant/table-header.const';
import notificationCreator from '../../helpers/notification.helper';
import {
  validateData,
  validateUserEdit
} from '../../helpers/validation.helper';
import SelectField from '../../component/select';
import { useAllProjects } from '../../hooks/use-all-projects';
import Loading from '../../component/loading';
import NotFound from '../not-found';
import type { UserDataType } from '../../types/services.type';
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

const UserEditPage: FC = () => {
  const [userData, setUserData] = useState({} as UserDataType);
  const [errors, setErrors] = useState({} as Record<string, string | null>);
  const { username } = useParams<{ username: string }>();
  const { user, isLoading, error } = useUser(username);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useAllProjects();

  useEffect(() => {
    if (user) {
      setUserData({ ...user } as UserDataType);
    }
  }, [user]);

  const projectsField = useMemo(
    () =>
      projects.filter(
        ({ name }) =>
          !userData?.projectsList?.some((item) => item.name.includes(name))
      ),
    [userData, projects]
  );

  const handlerChangeUserData = useCallback(
    (name, value) => {
      if (name === 'projectsList') {
        value = userData.projectsList.filter((item) => item.value !== value);
      }
      if (name === 'addProject') {
        if (value) {
          name = 'projectsList';
          const needProject = projects.find(
            (project) => project.value === value
          );
          value = userData.projectsList.concat(needProject as Item);
        }
      }
      setUserData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));

      return setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    },
    [userData]
  );

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handlerSaveUserData = async () => {
    const { id, projectsList, ...checkData } = userData;

    const resultUserData = validateData(checkData, validateUserEdit);

    if (resultUserData.isValid) {
      const body = {
        ...userData,
        projectsList: projectsList.map(({ value }) => value),
        id
      };
      await UsersService.updateUser(body)
        .then(() => {
          notificationCreator.showOnSuccess('The user has been changed');
          dispatch(resetStore());
          return history.push(PAGES_LINKS.USERS);
        })
        .catch(() => {
          notificationCreator.showOnFailure('User changes have not been saved');
        });
    } else {
      setErrors(resultUserData.errors);
    }
  };

  const editTableFields = usersEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={userData[item] as string}
      name={item}
      key={item}
      onChange={handlerChangeUserData}
      error={errors[item]}
    />
  ));

  return (
    <>
      <EditHeader
        breadcrumbLabel="Users"
        breadcrumbLink={PAGES_LINKS.PROJECTS}
        pageName={user?.username}
        onClick={handlerSaveUserData}
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
            name="addProject"
            options={projectsField}
            placeholder="Add Project"
            onChange={handlerChangeUserData}
            className={classes.selectFields}
          />
          {editTableFields}
        </Box>
        <EditList
          list={userData?.projectsList}
          labelList="Projects List"
          onChange={handlerChangeUserData}
          name="projectsList"
          buttonText="Delete project from user"
          link={PAGES_LINKS.PROJECT}
        />
      </Box>
    </>
  );
};

export default UserEditPage;
