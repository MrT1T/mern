import React, { ChangeEventHandler, FC } from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import type { OnClickHandlerType } from '../../types/func.type';

const useStyles = makeStyles({
  input: {
    padding: '12px 15px',
    border: '0.1rem solid rgba(0, 0, 0, 0.54)',
    width: '300px',
    borderRadius: '8px'
  }
});

export interface InputPropsType {
  name: string;
  className?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange: OnClickHandlerType;
}

const Input: FC<InputPropsType> = ({
  name,
  value = '',
  placeholder = '',
  className = '',
  type = 'text',
  onChange
}) => {
  const classes = useStyles();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <input
      name={name}
      value={value}
      type={type}
      className={classNames(classes.input, className)}
      placeholder={placeholder}
      onChange={handleChange}
      id={name}
    />
  );
};

export default Input;
