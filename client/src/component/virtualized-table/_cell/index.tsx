import React, { FC, ReactNode } from 'react';
import { makeStyles, TableCell } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  cell: {
    width: '20%',
    borderBottom: 'none'
  }
});

interface CellProps {
  className?: string;
  children?: ReactNode;
}

const Cell: FC<CellProps> = ({ children, className }) => {
  const classes = useStyles();
  const classnames = classNames(className, classes.cell);
  return (
    <TableCell className={classnames} component="div" align="center">
      {children}
    </TableCell>
  );
};

export default Cell;
