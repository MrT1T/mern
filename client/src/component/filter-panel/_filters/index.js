import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import SelectField from '../../select';
import { firstLetterUpperCase } from '../../../helpers/first-letter-upper-case.helper';

const useStyles = makeStyles({
  selectContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const Filters = ({ filterOptions, filterData, onChange, fields }) => {
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

Filters.propTypes = {
  filterOptions: PropTypes.object,
  onChange: PropTypes.func,
  fields: PropTypes.array,
  filterData: PropTypes.object
};
