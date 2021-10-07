import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page from './component/page';
import UsersPage from './pages/users';
import UserEditPage from './pages/user-edit';
import GroupsPage from './pages/groups';
import GroupEditPage from './pages/group-edit';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import { useAuth } from './hooks/use-auth';

function App() {
  const { isAuth, login, logout } = useAuth();
  if (isAuth) {
    return (
      <Page logout={logout}>
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
      <Route exact path="/*">
        <SignIn login={login} />
      </Route>
    </Switch>
  );
}

export default App;
