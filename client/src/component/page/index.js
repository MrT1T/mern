import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import Header from './_header';
import Footer from './_footer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100%',
    overflowX: 'hidden'
  },
  main: {
    flexGrow: 1,
    height: '100%'
  }
});

const Page = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Box>
  );
};

export default Page;

Page.propTypes = {
  children: PropTypes.node
};
