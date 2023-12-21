import React, { FC } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouteMatch, NavLink } from 'react-router-dom';

const NavBar: FC = () => {
  const routeMatch = useRouteMatch(['/users', '/projects']);
  const currentTab = routeMatch?.path || false;

  return (
    <Tabs value={currentTab}>
      <Tab label="Users" value="/users" to="/users" component={NavLink} />
      <Tab
        label="Projects"
        value="/projects"
        to="/projects"
        component={NavLink}
      />
    </Tabs>
  );
};

export default NavBar;
