import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Header from './_header';
import Footer from './_footer';
import type { AuthHookType } from '../../types/hooks.type';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100%'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }
});

const Page: FC<Pick<AuthHookType, 'logout'>> = ({ children, logout }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header logout={logout} />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Box>
  );
};

export default Page;
