import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { ReactComponent as Filter } from '../../img/filter.svg';
import Filters, { FiltersPropsType } from './_filters';

const useStyles = makeStyles({
  filterContainer: {
    borderBottom: '1px solid #d9dddd',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterLabel: {
    display: 'flex',
    margin: '10px',
    gap: '10px'
  },
  filterIcon: {
    width: '40px',
    height: '40px'
  }
});

const FilterPanel: FC<FiltersPropsType> = ({
  filterOptions,
  filterData,
  onChange,
  fields
}) => {
  const classes = useStyles();
  return (
    <Box data-testid="filter" className={classes.filterContainer}>
      <Box className={classes.filterLabel}>
        <Filter className={classes.filterIcon} />
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Filter
        </Typography>
      </Box>
      <Filters
        filterOptions={filterOptions}
        filterData={filterData}
        onChange={onChange}
        fields={fields}
      />
    </Box>
  );
};
export default FilterPanel;
