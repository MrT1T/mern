import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { useGroup } from '../../hooks/use-group';
import { PAGES_LINKS } from '../../constant/links.const';
import EditHeader from '../../component/edit-header';
import EditField from '../../component/edit-field';
import EditList from '../../component/edit-list';
import { firstLetterUpperCase } from '../../helpers/firstLetterUpperCase.helper';

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

  const handlerSaveGroupData = () => {
    console.log(groupData);
  };

  // eslint-disable-next-line array-callback-return,consistent-return
  const needEditFields = Object.keys(groupData).map((item) => {
    if (item !== 'usersList') {
      return (
        <EditField
          fieldLabel={firstLetterUpperCase(item)}
          placeholder="Change username"
          value={groupData[item]}
          name={item}
          key={item}
          onChange={handlerChangeGroupData}
        />
      );
    }
  });

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
          {needEditFields}
          {/* <EditField */}
          {/*  fieldLabel="Group name" */}
          {/*  placeholder="Change group name" */}
          {/*  value={groupData?.name} */}
          {/*  name="name" */}
          {/*  onChange={handlerChangeGroupData} */}
          {/* /> */}
          {/* <EditField */}
          {/*  fieldLabel="Group title" */}
          {/*  placeholder="Change group title" */}
          {/*  value={groupData?.title} */}
          {/*  name="title" */}
          {/*  onChange={handlerChangeGroupData} */}
          {/* /> */}
        </Container>
        <EditList
          list={groupData?.usersList}
          labelList="Users List"
          onChange={handlerChangeGroupData}
          name="usersList"
          buttonText="Delete user from group"
        />
      </Box>
    </>
  );
};

export default GroupEditPage;
