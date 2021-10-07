import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import NavBar from '../_navbar';

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

const Header = ({ logout }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar>
        <NavBar />
        <Typography variant="h6"> Smile you can do everything </Typography>
        <Button className={classes.button} variant="outlined" onClick={logout}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  logout: PropTypes.func
};
