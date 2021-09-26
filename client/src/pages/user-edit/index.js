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
      // eslint-disable-next-line no-param-reassign
      value = userData.groupsList.filter((item) => item !== value);
    }
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlerSaveGroupData = async () => {
    const body = { ...userData, id: user.id };
    await UsersService.updateUser(body);
    dispatch(resetStore());
    return history.push(PAGES_LINKS.USERS);
  };

  const editTableFields = usersEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={userData[item]}
      name={item}
      key={item}
      onChange={handlerChangeUserData}
    />
  ));

  return (
    <>
      <EditHeader
        breadcrumbLabel="Users"
        breadcrumbLink={PAGES_LINKS.GROUPS}
        pageName={user?.username}
        onClick={handlerSaveGroupData}
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
