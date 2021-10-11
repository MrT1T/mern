import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { ReactComponent as NotFoundIcon } from '../../img/404.svg';
import { PAGES_LINKS } from '../../constant/links.const';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%',
    gap: '20px',
    color: 'var(--periwinkle-gray)'
  },
  button: {
    backgroundColor: 'var(--strong-blue)',
    color: 'var(--white)',
    '&:hover': {
      backgroundColor: 'var(--gray-blue)'
    }
  }
});

const NotFound = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <NotFoundIcon />
      <Typography variant="h3">Page not found</Typography>
      <Typography variant="h6">
        Make sure the address is correct and page hasn`t moved
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        href={PAGES_LINKS.USERS}
      >
        Back to users page
      </Button>
    </Box>
  );
};

export default NotFound;
