import { Box, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import React from 'react';
import PropTypes from 'prop-types';
import InfiniteLoader from 'react-window-infinite-loader';
import Row from '../_row';

const useStyles = makeStyles({
  body: {
    border: '1px solid #d9dddd'
  }
});

const TableContent = ({
  cellData,
  className,
  loadNextPage,
  status,
  hasNextPage
}) => {
  const classes = useStyles();

  const isNextPageLoading = ['loading', 'idle'].includes(status);
  const isItemLoaded = (index) => !hasNextPage || index < cellData.length;
  const itemCount = hasNextPage ? cellData.length + 1 : cellData.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  return (
    <Box className={className}>
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
                  isItemLoaded
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
  cellData: PropTypes.array,
  loadNextPage: PropTypes.func,
  status: PropTypes.string,
  hasNextPage: PropTypes.bool,
  className: PropTypes.string
};
