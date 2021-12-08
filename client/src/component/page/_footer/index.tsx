import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Copyright from '../../copyright';

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

const Footer: FC = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Copyright className={classes.text} />
    </Box>
  );
};

export default Footer;
