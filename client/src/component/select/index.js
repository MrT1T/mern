import React, { useMemo } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDebounced } from '../../hooks/use-debounced';

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
    if (!selectedOptions) return onChange(name, null);
    return onChange(name, selectedOptions.value);
  };

  const onInputChange = useDebounced(onChange, 500);

  const handleInputChange = (searchText, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      onInputChange(name, searchText);
    }
  };

  const parsedOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option,
        label: `${option}`
      })),
    [options]
  );

  const parsedValue = useMemo(() => {
    const currentValue = parsedOptions.filter(
      (option) => option.value === value
    );
    if (currentValue.length === 0 && value) {
      currentValue.push({
        value,
        label: `${value}`
      });
    }
    return currentValue;
  }, [value, parsedOptions]);

  return (
    <Box className={classes.selectContainer}>
      <Select
        placeholder={placeholder}
        id={name}
        value={parsedValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
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
