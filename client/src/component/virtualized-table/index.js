import React from 'react';
import { makeStyles, Table } from '@material-ui/core';
import PropTypes from 'prop-types';

import TableHeader from './_header';
import TableContent from './_body';

const useStyles = makeStyles({
  table: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  tableBody: {
    flexGrow: 1
  }
});

const VirtualizedTable = ({
  cellHeaderData,
  cellBodyData,
  loadNextPage,
  status,
  hasNextPage
}) => {
  const classes = useStyles();
  return (
    <Table component="div" className={classes.table}>
      <TableHeader cellData={cellHeaderData} />
      <TableContent
        className={classes.tableBody}
        cellData={cellBodyData}
        loadNextPage={loadNextPage}
        status={status}
        hasNextPage={hasNextPage}
      />
    </Table>
  );
};

export default VirtualizedTable;

VirtualizedTable.propTypes = {
  cellHeaderData: PropTypes.array,
  loadNextPage: PropTypes.func,
  status: PropTypes.string,
  hasNextPage: PropTypes.bool,
  cellBodyData: PropTypes.array
};
