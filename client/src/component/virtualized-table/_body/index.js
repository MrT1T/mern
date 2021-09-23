import { makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import React from 'react';
import PropTypes from 'prop-types';
import Row from '../_row';

const useStyles = makeStyles({
  body: {
    border: '1px solid #d9dddd'
  }
});

const TableContent = ({ cellData }) => {
  const classes = useStyles();

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          className={classes.body}
          height={height}
          itemCount={cellData.length}
          itemData={{
            cellData
          }}
          itemSize={55}
          width={width}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default TableContent;

TableContent.propTypes = {
  cellData: PropTypes.array
};
