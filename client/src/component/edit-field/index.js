import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';

const useStyles = makeStyles({
  editField: {
    margin: '20px',
    width: '200px'
  }
});

const EditField = ({ fieldLabel, placeholder, value, name, onChange }) => {
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
    </Box>
  );
};

export default EditField;

EditField.propTypes = {
  fieldLabel: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
};
