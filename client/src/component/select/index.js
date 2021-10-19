import React, { useMemo } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
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
  onInputChange = () => {},
  options = [],
  name = '',
  placeholder = '',
  value = '',
  className = ''
}) => {
  const classes = useStyles();

  const handleChange = (selectedOptions) => {
    if (!selectedOptions) return onChange(name, null);
    return onChange(name, selectedOptions.value);
  };

  const onInputChangeDelay = useDebounced(onInputChange, 1000);

  const handleInputChange = (searchText, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      onInputChangeDelay(name, searchText);
    }
  };

  const parsedOptions = useMemo(() => {
    if (options[0] !== Object(options[0])) {
      return options.map((option) => ({
        value: option,
        label: `${option}`
      }));
    }
    return options.map((option) => ({
      value: option,
      label: option.name
    }));
  }, [options]);

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
    <Box data-testid="selectContainer" className={classes.selectContainer}>
      <Select
        placeholder={placeholder}
        id={name}
        value={parsedValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={parsedOptions}
        isClearable
        className={classNames(classes.select, className)}
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
  className: PropTypes.string,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func
};
