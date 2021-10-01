import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useGroup } from '../../hooks/use-group';
import { PAGES_LINKS } from '../../constant/links.const';
import EditHeader from '../../component/edit-header';
import EditField from '../../component/edit-field';
import EditList from '../../component/edit-list';
import { firstLetterUpperCase } from '../../helpers/first-letter-upper-case.helper';
import { resetStore } from '../../store/thunks/reset-store.thunk';
import { GroupsService } from '../../services/groups.service';
import { groupEditFields } from '../../constant/table-header.const';
import notificationCreator from '../../helpers/notification.helper';
import {
  validateData,
  validateGroupEdit
} from '../../helpers/validation.helper';
import { useAllUsers } from '../../hooks/use-all-users';
import SelectField from '../../component/select';

const useStyles = makeStyles({
  editContainer: {
    display: 'flex'
  },
  editFields: {
    width: '20%'
  },
  selectFields: {
    width: '300px',
    margin: '30px 0 0 10px'
  }
});

const GroupEditPage = () => {
  const [groupData, setGroupData] = useState({});
  const [errors, setErrors] = useState({});
  const { groupname } = useParams();
  const group = useGroup(groupname);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useAllUsers();

  useEffect(() => {
    if (group) {
      setGroupData({
        name: group.name,
        title: group.title,
        usersList: group.usersList
      });
    }
  }, [group]);

  const usersField = useMemo(
    () => users.filter((user) => !groupData.usersList?.includes(user)),
    [groupData, users]
  );

  const handlerChangeGroupData = (name, value) => {
    if (name === 'usersList') {
      value = groupData.usersList.filter((item) => item !== value);
    }

    if (name === 'addUser') {
      name = 'usersList';
      value = groupData.usersList.concat(value);
    }

    setGroupData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handlerSaveGroupData = async () => {
    const resultUserData = validateData(groupData, validateGroupEdit);

    if (resultUserData.isValid) {
      const body = { ...groupData, groupId: group.groupId };
      await GroupsService.updateGroup(body)
        .then(() => {
          notificationCreator.showOnSuccess('The group has been changed');
          dispatch(resetStore());
          return history.push(PAGES_LINKS.GROUPS);
        })
        .catch((error) => {
          notificationCreator.showOnFailure(`${error.data[0].message}`);
        });
    } else {
      setErrors(resultUserData.errors);
    }
  };

  const editTableFields = groupEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={groupData[item]}
      name={item}
      key={item}
      onChange={handlerChangeGroupData}
      error={errors[item]}
    />
  ));

  return (
    <>
      <EditHeader
        breadcrumbLabel="Group"
        breadcrumbLink={PAGES_LINKS.GROUPS}
        pageName={group?.name}
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
          <SelectField
            name="addUser"
            options={usersField}
            placeholder="Add User"
            onChange={handlerChangeGroupData}
            className={classes.selectFields}
          />
        </Container>
        <EditList
          list={groupData?.usersList}
          labelList="Users List"
          onChange={handlerChangeGroupData}
          name="usersList"
          buttonText="Delete user from group"
          link={PAGES_LINKS.PROFILE}
        />
      </Box>
    </>
  );
};

export default GroupEditPage;
