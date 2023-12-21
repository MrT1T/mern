import React, { CSSProperties, FC } from 'react';
import { makeStyles, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CellProject from '../_cell-project';
import { linksHelper } from '../../../helpers/links.helper';
import type { CellBodyDataType } from '../_body';

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

interface RowPropsType {
  data: Pick<CellBodyDataType, 'pagesCount' | 'cellData' | 'link'> & {
    isItemLoaded: (arg: number) => boolean;
  };
  index: number;
  style: CSSProperties;
}

const Row: FC<RowPropsType> = ({ data, index, style }) => {
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
    return <CellProject item={currentElement} />;
  };

  const onClick = () => {
    if (cellData.length !== 0 && currentElement) {
      history.push(
        linksHelper(
          link,
          'username' in currentElement
            ? currentElement.username
            : currentElement.name
        )
      );
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
