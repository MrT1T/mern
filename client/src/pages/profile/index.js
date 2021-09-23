import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import EditHeader from '../../component/edit-header';
import { PAGES_LINKS } from '../../constant/links.const';
import EditField from '../../component/edit-field';
import EditList from '../../component/edit-list';
import { useUser } from '../../hooks/use-user';
import { firstLetterUpperCase } from '../../helpers/firstLetterUpperCase.helper';

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

  const handlerSaveGroupData = () => {
    console.log(userData);
  };

  // eslint-disable-next-line array-callback-return,consistent-return
  const needEditFields = Object.keys(userData).map((item) => {
    if (item !== 'groupsList') {
      return (
        <EditField
          fieldLabel={firstLetterUpperCase(item)}
          placeholder="Change username"
          value={userData[item]}
          name={item}
          key={item}
          onChange={handlerChangeUserData}
        />
      );
    }
  });

  return (
    <>
      <EditHeader
        breadcrumbLabel="Group"
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
          {needEditFields}
        </Container>
        <EditList
          list={userData?.groupsList}
          labelList="Groups List"
          onChange={handlerChangeUserData}
          name="groupsList"
          buttonText="Delete group from user"
        />
      </Box>
    </>
  );
};

export default UserEditPage;
