import React from 'react';
import { makeStyles, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CellGroup from '../_cell-group';
import { PAGES_LINKS } from '../../../constant/links.const';

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
  // const { cellData, isItemLoaded, pagesCount } = data;

  const currentElement = data.cellData[index];

  const rowData = () => {
    if (data.cellData.length === 0 && data.pagesCount === 0) {
      return 'Result is empty';
    }
    if (!data.isItemLoaded(index)) {
      return 'Loading...';
    }
    return <CellGroup item={currentElement} />;
  };

  const onClick = () => {
    if (data.cellData.length === 0) {
      return;
    }
    if (currentElement.username) {
      history.push(PAGES_LINKS.PROFILE(currentElement.username));
    } else {
      history.push(PAGES_LINKS.GROUP(currentElement.name));
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
