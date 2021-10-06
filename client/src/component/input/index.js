import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  input: {
    padding: '12px 15px',
    border: '0.1rem solid rgba(0, 0, 0, 0.54)',
    width: '300px',
    borderRadius: '8px'
  }
});

export default function Input({
  name,
  value = '',
  placeholder = '',
  className = '',
  type = 'text',
  onChange
}) {
  const classes = useStyles();
  const handleChange = (e) => {
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
}

Input.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};
