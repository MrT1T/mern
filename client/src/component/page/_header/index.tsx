import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../_navbar';
import type { AuthHookType } from '../../../types/hooks.type';

const useStyles = makeStyles({
  header: {
    height: '60px'
  },
  button: {
    marginLeft: 'auto',
    color: 'var(--white)',
    borderColor: 'var(--white)',
    '&:hover': {
      background: 'var(--periwinkle-gray)'
    }
  }
});

const Header: FC<Pick<AuthHookType, 'logout'>> = ({ logout }) => {
  const classes = useStyles();
  const history = useHistory();

  const logOutHandler = () => {
    logout();
    history.push('/');
  };

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <NavBar />
        <Typography variant="h6"> Smile you can do everything </Typography>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={logOutHandler}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
