import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, makeStyles, Typography } from '@material-ui/core';
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
import NotFound from '../not-found';
import Loading from '../../component/loading';
import type {
  GroupDataType,
  UpdateGroupBodyType
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

const GroupEditPage: FC = () => {
  const [groupData, setGroupData] = useState({} as GroupDataType);
  const [errors, setErrors] = useState({} as Record<string, string | null>);
  const { groupname } = useParams<{ groupname: string }>();
  const { group, isLoading, error } = useGroup(groupname);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useAllUsers();

  useEffect(() => {
    if (group) {
      setGroupData({ ...group } as GroupDataType);
    }
  }, [group]);

  const usersField = useMemo(
    () =>
      users.filter(
        ({ name }) =>
          !groupData.usersList?.some((item) => item.name.includes(name))
      ),
    [groupData, users]
  );

  const handlerChangeGroupData = useCallback(
    (name, value) => {
      if (name === 'usersList') {
        value = groupData.usersList.filter((item) => item.value !== value);
      }

      if (name === 'addUser') {
        if (value) {
          name = 'usersList';
          const needUser = users.find((user) => user.value === value);
          value = groupData.usersList.concat(needUser as Item);
        }
      }

      setGroupData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));

      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    },
    [groupData]
  );

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handlerSaveGroupData = async () => {
    const { usersList, groupId, ...checkData } = groupData;
    const resultUserData = validateData(checkData, validateGroupEdit);

    if (resultUserData.isValid) {
      const body: UpdateGroupBodyType = {
        ...groupData,
        usersList: usersList.map(({ value }) => value),
        groupId
      };
      await GroupsService.updateGroup(body)
        .then(() => {
          notificationCreator.showOnSuccess('The group has been changed');
          dispatch(resetStore());
          return history.push(PAGES_LINKS.GROUPS);
        })
        .catch(() => {
          notificationCreator.showOnFailure(
            'Group changes have not been saved'
          );
        });
    } else {
      setErrors(resultUserData.errors);
    }
  };

  const editTableFields = groupEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={groupData[item] as string}
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
            onChange={handlerChangeGroupData}
            className={classes.selectFields}
          />
          {editTableFields}
        </Box>
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
