import React, { FC, useCallback, useMemo } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Select from 'react-select';
import classNames from 'classnames';
import { useDebounced } from '../../hooks/use-debounced';
import type {
  OnChangeHandlerType,
  onInputChangeDelayType
} from '../../types/func.type';
import type { Item } from '../../types/store.type';

const useStyles = makeStyles({
  selectContainer: {
    margin: '10px'
  },
  select: {
    width: '200px'
  }
});

interface SelectFieldPropsType {
  name: string;
  value?: string;
  options: Array<Item> | Array<string>;
  placeholder?: string;
  className?: string;
  onInputChange?: OnChangeHandlerType;
  onChange: OnChangeHandlerType;
}

const SelectField: FC<SelectFieldPropsType> = ({
  onChange,
  onInputChange = () => {},
  options = [],
  name = '',
  placeholder = '',
  value = '',
  className = ''
}) => {
  const classes = useStyles();

  const handleChange = useCallback(
    (selectedOptions) => {
      if (selectedOptions) {
        onChange(name, selectedOptions.value);
      } else {
        onChange(name, null);
      }
    },
    [onChange]
  );

  const onInputChangeDelay: onInputChangeDelayType = useDebounced(
    onInputChange,
    1000
  );

  const handleInputChange = useCallback(
    (searchText: string, actionMeta: { action: string }) => {
      if (actionMeta.action === 'input-change') {
        onInputChangeDelay(name, searchText);
      }
    },
    [onInputChange]
  );

  const parsedOptions = useMemo(() => {
    if (typeof options[0] === 'string') {
      return (options as Array<string>).map((option) => ({
        value: option,
        label: option
      }));
    }

    return (options as Array<Item>).map((option) => ({
      value: option.value,
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
        label: value
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
