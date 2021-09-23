import React from 'react';
import { makeStyles, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const useStyles = makeStyles({
  cell: {
    width: '20%',
    borderBottom: 'none'
  }
});

const Cell = ({ children, className }) => {
  const classes = useStyles();
  const classnames = classNames(className, classes.cell);
  return (
    <TableCell className={classnames} component="div" align="center">
      {children}
    </TableCell>
  );
};

export default Cell;

Cell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
