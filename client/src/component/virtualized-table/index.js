import React from 'react';
import { makeStyles, Table } from '@material-ui/core';
import PropTypes from 'prop-types';
import TableHeader from './_header';
import TableContent from './_body';

const useStyles = makeStyles({
  table: {
    height: '100%'
  }
});

const VirtualizedTable = ({ cellHeaderData, cellBodyData }) => {
  const classes = useStyles();
  return (
    <Table component="div" className={classes.table}>
      <TableHeader cellData={cellHeaderData} />
      <TableContent cellData={cellBodyData} />
    </Table>
  );
};

export default VirtualizedTable;

VirtualizedTable.propTypes = {
  cellHeaderData: PropTypes.array,
  cellBodyData: PropTypes.array
};
