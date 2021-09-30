import React from 'react';
import { makeStyles, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CellGroup from '../_cell-group';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    '&[data-even = "true"]': {
      backgroundColor: '#f8f8f0'
    }
  }
});

const Row = ({ data, index, style }) => {
  const classes = useStyles();
  const history = useHistory();
  const { cellData, isItemLoaded, pagesCount, link } = data;

  const currentElement = cellData[index];

  const rowData = () => {
    if (cellData.length === 0 && pagesCount === 0) {
      return 'Result is empty';
    }
    if (!isItemLoaded(index)) {
      return 'Loading...';
    }
    return <CellGroup item={currentElement} />;
  };

  const onClick = () => {
    if (data.cellData.length !== 0) {
      history.push(link(currentElement.username || currentElement.name));
    }
  };

  return (
    <TableRow
      component="div"
      className={classes.row}
      data-even={index % 2 === 0}
      style={style}
      onClick={onClick}
    >
      {rowData()}
    </TableRow>
  );
};

export default Row;

Row.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  style: PropTypes.object
};
