import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import SelectField from '../../select';
import { firstLetterUpperCase } from '../../../helpers/first-letter-upper-case.helper';
import type { Item } from '../../../types/store.type';

const useStyles = makeStyles({
  selectContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export interface FiltersPropsType {
  filterOptions: Record<string, Array<Item> | Array<string>>;
  onChange: () => void;
  fields: Array<string>;
  filterData: Record<string, string>;
}

const Filters: FC<FiltersPropsType> = ({
  filterOptions,
  filterData,
  onChange,
  fields
}) => {
  const classes = useStyles();
  const selectGroup = fields.map((item) => (
    <SelectField
      name={item}
      key={item}
      options={filterOptions[item]}
      placeholder={firstLetterUpperCase(item)}
      value={filterData[item]}
      onChange={onChange}
      onInputChange={onChange}
    />
  ));

  return <Box className={classes.selectContainer}>{selectGroup}</Box>;
};

export default Filters;
