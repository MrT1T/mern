import { Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import Page from './component/page';
import UsersPage from './pages/users';
import UserEditPage from './pages/user-edit';
import ProjectsPage from './pages/projects';
import ProjectEditPage from './pages/project-edit';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import { useAuth } from './hooks/use-auth';

const App: FC = () => {
  const { isAuth, login, logout } = useAuth();
  if (isAuth) {
    return (
      <Page logout={logout}>
        <Switch>
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/user/:username" component={UserEditPage} />
          <Route exact path="/projects" component={ProjectsPage} />
          <Route
            exact
            path="/project/:projectname"
            component={ProjectEditPage}
          />
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
};

export default App;
