import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavBar from '../_navbar';

const useStyles = makeStyles({
  header: {
    justifyContent: 'space-between'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.header}>
        <NavBar />
        <Box>
          <Typography variant="h6"> Smile you can do everything </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
