import React, { FC } from 'react';
import { makeStyles, Table } from '@material-ui/core';
import TableHeader, { TableHeaderPropsType } from './_header';
import TableContent, { CellBodyDataType } from './_body';

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

interface VirtualizedTablePropsType extends TableHeaderPropsType {
  cellBodyData: CellBodyDataType;
}

const VirtualizedTable: FC<VirtualizedTablePropsType> = ({
  cellHeaderData,
  cellBodyData
}) => {
  const classes = useStyles();
  return (
    <Table component="div" className={classes.table}>
      <TableHeader cellHeaderData={cellHeaderData} />
      <TableContent cellBodyData={cellBodyData} className={classes.tableBody} />
    </Table>
  );
};

export default VirtualizedTable;
