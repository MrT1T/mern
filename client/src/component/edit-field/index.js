import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Error from '../error-massege';

const useStyles = makeStyles({
  editField: {
    margin: '20px',
    width: '300px',
    position: 'relative'
  }
});

const EditField = ({
  fieldLabel,
  placeholder,
  value,
  name,
  onChange,
  error
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.editField}>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        {fieldLabel}
      </Typography>
      <Input
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <Error message={error} />}
    </Box>
  );
};

export default EditField;

EditField.propTypes = {
  fieldLabel: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string
};
