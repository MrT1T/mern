import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import SelectField from '../../select';
import { firstLetterUpperCase } from '../../../helpers/first-letter-upper-case.helper';
import type { OnChangeHandlerType } from '../../../types/func.type';

const useStyles = makeStyles({
  selectContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export interface FiltersPropsType {
  filterOptions: Record<string, Array<string>>;
  onChange: OnChangeHandlerType;
  fields: Array<string>;
  filterData: Record<string, string | undefined>;
}

const Filters: FC<FiltersPropsType> = ({
  filterOptions,
  filterData,
  onChange,
  fields
}) => {
  const classes = useStyles();
  const selectProject = fields.map((item) => (
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

  return <Box className={classes.selectContainer}>{selectProject}</Box>;
};

export default Filters;
