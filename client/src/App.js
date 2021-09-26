import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupsPage from './pages/groups';
import UsersPage from './pages/users';
import UserEditPage from './pages/user-edit';
import Page from './component/page';
import GroupEditPage from './pages/group-edit';

function App() {
  return (
    <Page>
      <Switch>
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/user/:username" component={UserEditPage} />
        <Route exact path="/groups" component={GroupsPage} />
        <Route exact path="/group/:groupname" component={GroupEditPage} />
      </Switch>
    </Page>
  );
}

export default App;
