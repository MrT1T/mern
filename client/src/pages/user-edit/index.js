import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
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

const useStyles = makeStyles({
  editContainer: {
    display: 'flex'
  },
  editFields: {
    width: '20%'
  }
});

const UserEditPage = () => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const { username } = useParams();
  const user = useUser(username);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        groupsList: user.groupsList
      });
    }
  }, [user]);

  const handlerChangeUserData = (name, value) => {
    if (name === 'groupsList') {
      value = userData.groupsList.filter((item) => item !== value);
    }
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handlerSaveUserData = async () => {
    const resultUserData = validateData(userData, validateUserEdit);

    if (resultUserData.isValid) {
      const body = { ...userData, id: user.id };
      await UsersService.updateUser(body)
        .then(() => {
          notificationCreator.showOnSuccess('The user has been changed');
          dispatch(resetStore());
          return history.push(PAGES_LINKS.USERS);
        })
        .catch((error) => {
          notificationCreator.showOnFailure(`${error.data[0].message}`);
        });
    } else {
      setErrors(resultUserData.errors);
    }
  };

  const editTableFields = usersEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={userData[item]}
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
        breadcrumbLink={PAGES_LINKS.GROUPS}
        pageName={user?.username}
        onClick={handlerSaveUserData}
      />
      <Box className={classes.editContainer}>
        <Container className={classes.editFields}>
          <Typography
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Edit Fields
          </Typography>
          {editTableFields}
        </Container>
        <EditList
          list={userData?.groupsList}
          labelList="Groups List"
          onChange={handlerChangeUserData}
          name="groupsList"
          buttonText="Delete group from user"
          link={PAGES_LINKS.GROUP}
        />
      </Box>
    </>
  );
};

export default UserEditPage;
