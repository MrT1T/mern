import * as React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    zIndex: 100,
    height: '60px',
    padding: '24px 0',
    color: 'var(--white)',
    backgroundColor: 'var(--azure-blue)'
  },
  text: {
    marginLeft: '100px'
  }
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Typography className={classes.text} variant="body2">
        Copyright &#169; Your Smile site 2021
      </Typography>
    </Box>
  );
}
