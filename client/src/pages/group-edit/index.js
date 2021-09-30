import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
  editContainer: {
    display: 'flex'
  },
  editFields: {
    width: '20%'
  }
});

const GroupEditPage = () => {
  const [groupData, setGroupData] = useState({});
  const { groupname } = useParams();
  const group = useGroup(groupname);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (group) {
      setGroupData({
        name: group.name,
        title: group.title,
        usersList: group.usersList
      });
    }
  }, [group]);

  const handlerChangeGroupData = (name, value) => {
    if (name === 'usersList') {
      // eslint-disable-next-line no-param-reassign
      value = groupData.usersList.filter((item) => item !== value);
    }
    setGroupData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlerSaveGroupData = async () => {
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
  };

  const editTableFields = groupEditFields.map((item) => (
    <EditField
      fieldLabel={firstLetterUpperCase(item)}
      value={groupData[item]}
      name={item}
      key={item}
      onChange={handlerChangeGroupData}
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
