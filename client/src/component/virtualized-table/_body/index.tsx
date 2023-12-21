import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Row from '../_row';
import { STATUS } from '../../../constant/status.const';
import { PAGES_LINKS } from '../../../constant/links.const';
import type { Project, pagesCountType, User } from '../../../types/store.type';

const useStyles = makeStyles({
  body: {
    border: '1px solid #d9dddd'
  }
});

export interface CellBodyDataType {
  loadNextPage: () => void;
  status: STATUS;
  hasNextPage: boolean;
  pagesCount: pagesCountType;
  cellData: Array<User> | Array<Project>;
  link: typeof PAGES_LINKS[keyof typeof PAGES_LINKS];
}

interface TableContentProps {
  className: string;
  cellBodyData: CellBodyDataType;
}

const TableContent: FC<TableContentProps> = ({ cellBodyData, className }) => {
  const classes = useStyles();

  const { loadNextPage, status, hasNextPage, pagesCount, cellData, link } =
    cellBodyData;

  const isNextPageLoading = [STATUS.LOADING, STATUS.IDLE].includes(status);
  const isItemLoaded = (index: number): boolean =>
    !hasNextPage || index < cellData.length;
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
