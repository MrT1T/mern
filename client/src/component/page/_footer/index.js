import * as React from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    zIndex: 100,
    height: '60px',
    padding: '24px 0',
    color: '#fff',
    backgroundColor: '#3f51b5'
  }
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Container>
        <Typography variant="body2">
          Copyright &#169; Your Smile site 2021
        </Typography>
      </Container>
    </Box>
  );
}
