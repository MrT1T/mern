import React, { FC } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { ReactComponent as ErrorIcon } from '../../img/error-icon.svg';

const useStyles = makeStyles({
  error: {
    position: 'absolute',
    top: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  message: {
    color: 'var(--red)',
    fontSize: '12px',
    margin: '2px 0 0 8px'
  }
});

interface ErrorPropsType {
  message?: string;
  className?: string;
}

const Error: FC<ErrorPropsType> = ({ message, className = '' }) => {
  const classes = useStyles();

  if (!message) return null;

  return (
    <div
      data-testid="errorMessage"
      className={classnames(classes.error, className)}
    >
      <ErrorIcon />
      <span className={classes.message}>{message}</span>
    </div>
  );
};

export default Error;
