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
    height: '60px'
  },
  toolbar: {
    justifyContent: 'space-between'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.header} position="static">
      <Toolbar className={classes.toolbar}>
        <NavBar />
        <Box>
          <Typography variant="h6"> Smile you can do everything </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
