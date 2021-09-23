import { makeStyles, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

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

const TableHeader = ({ cellData }) => {
  const classes = useStyles();
  const cell = cellData.map((item) => (
    <TableCell
      className={classes.cell}
      component="div"
      align="center"
      key={item}
    >
      {item}
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

TableHeader.propTypes = {
  cellData: PropTypes.array
};
