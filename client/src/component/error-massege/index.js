import React from 'react';
import PropTypes from 'prop-types';
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

export default function Error({ message, className = '' }) {
  const classes = useStyles();

  if (!message) return null;

  return (
    <div className={classnames(classes.error, className)}>
      <ErrorIcon />
      <span className={classes.message}>{message}</span>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string
};
