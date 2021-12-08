import React, { FC } from 'react';
import { makeStyles, TableCell, TableHead, TableRow } from '@material-ui/core';
import { firstLetterUpperCase } from '../../../helpers/first-letter-upper-case.helper';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cell: {
    width: '20%',
    borderBottom: 'none'
  }
});

export interface TableHeaderPropsType {
  cellHeaderData: Array<string>;
}

const TableHeader: FC<TableHeaderPropsType> = ({ cellHeaderData }) => {
  const classes = useStyles();
  const cell = cellHeaderData.map((item) => (
    <TableCell
      className={classes.cell}
      component="div"
      align="center"
      key={item}
    >
      {firstLetterUpperCase(item)}
    </TableCell>
  ));
  return (
    <TableHead component="div">
      <TableRow component="div" className={classes.row}>
        {cell}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
