import React from 'react';
import { makeStyles } from '@material-ui/core';
import loadingIcon from '../../img/loading.svg';

const useStyles = makeStyles({
  container: {
    width: '200px',
    height: '200px',
    backgroundImage: `url(${loadingIcon})`,
    backgroundRepeat: 'no-repeat',
    margin: 'auto'
  }
});

const Loading = () => {
  const classes = useStyles();
  return <div data-testid="loading" className={classes.container} />;
};

export default Loading;
