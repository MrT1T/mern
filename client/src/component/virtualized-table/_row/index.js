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

  const currentElement = data.cellData[index];

  if (!data.isItemLoaded(index)) {
    return (
      <TableRow
        component="div"
        className={classes.row}
        data-even={index % 2 === 0}
        style={style}
      >
        Loading...
      </TableRow>
    );
  }

  const onClick = () => {
    if (currentElement.username) {
      history.push(PAGES_LINKS.PROFILE(currentElement.username));
    } else {
      history.push(PAGES_LINKS.GROUP(currentElement.title));
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
      <CellGroup item={currentElement} />
    </TableRow>
  );
};

export default Row;

Row.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  style: PropTypes.object
};
