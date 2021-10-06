import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page from '../component/page';
import UsersPage from '../pages/users';
import UserEditPage from '../pages/user-edit';
import GroupsPage from '../pages/groups';
import GroupEditPage from '../pages/group-edit';
import SignIn from '../pages/sign-in';
import NotFound from '../pages/not-found';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Page>
        <Switch>
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/user/:username" component={UserEditPage} />
          <Route exact path="/groups" component={GroupsPage} />
          <Route exact path="/group/:groupname" component={GroupEditPage} />
          <Route exact path="/*" component={NotFound} />
        </Switch>
      </Page>
    );
  }
  return (
    <Switch>
      <Route exact path="/*" component={SignIn} />
    </Switch>
  );
};
