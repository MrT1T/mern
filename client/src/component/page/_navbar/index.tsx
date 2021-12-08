import React, { FC } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouteMatch, NavLink } from 'react-router-dom';

const NavBar: FC = () => {
  const routeMatch = useRouteMatch(['/users', '/groups']);
  const currentTab = routeMatch?.path || false;

  return (
    <Tabs value={currentTab}>
      <Tab label="Users" value="/users" to="/users" component={NavLink} />
      <Tab label="Groups" value="/groups" to="/groups" component={NavLink} />
    </Tabs>
  );
};

export default NavBar;
