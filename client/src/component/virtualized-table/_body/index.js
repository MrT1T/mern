import { Box, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from 'react-window-infinite-loader';
import Row from '../_row';
import { STATUS } from '../../../constant/status.const';

const useStyles = makeStyles({
  body: {
    border: '1px solid #d9dddd'
  }
});

const TableContent = ({ cellBodyData, className }) => {
  const classes = useStyles();

  const { loadNextPage, status, hasNextPage, pagesCount, cellData, link } =
    cellBodyData;

  const isNextPageLoading = [STATUS.LOADING, STATUS.IDLE].includes(status);
  const isItemLoaded = (index) => !hasNextPage || index < cellData.length;
  const itemCount = hasNextPage ? cellData.length + 1 : cellData.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  return (
    <Box data-testid="tableBody" className={className}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                className={classes.body}
                height={height}
                itemCount={itemCount}
                itemData={{
                  cellData,
                  isItemLoaded,
                  pagesCount,
                  link
                }}
                itemSize={55}
                ref={ref}
                width={width}
                onItemsRendered={onItemsRendered}
              >
                {Row}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Box>
  );
};

export default TableContent;

TableContent.propTypes = {
  cellBodyData: PropTypes.object,
  className: PropTypes.string
};
