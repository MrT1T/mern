import React, { useMemo } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';

const useStyles = makeStyles({
  selectContainer: {
    margin: '10px'
  },
  select: {
    width: '200px'
  }
});

const SelectField = ({
  onChange,
  options = [],
  name = '',
  placeholder = '',
  value = ''
}) => {
  const classes = useStyles();

  const handleChange = (selectedOptions) => {
    if (!selectedOptions) return onChange(name, '');
    return onChange(name, selectedOptions.value);
  };

  const parsedOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option,
        label: `${option}`
      })),
    [options]
  );

  const parsedValue = useMemo(
    () => parsedOptions.filter((option) => option.value === value),
    [value, parsedOptions]
  );

  return (
    <Box className={classes.selectContainer}>
      <Select
        placeholder={placeholder}
        id={name}
        value={parsedValue}
        onChange={handleChange}
        options={parsedOptions}
        isClearable
        className={classes.select}
      />
    </Box>
  );
};

export default SelectField;

SelectField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};
