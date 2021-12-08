import React, { FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Input, { InputPropsType } from '../input';
import Error from '../error-massege';

const useStyles = makeStyles({
  editField: {
    margin: '20px',
    width: '300px',
    position: 'relative'
  }
});

interface EditFieldPropsType extends InputPropsType {
  fieldLabel?: string;
  classNameInput?: string;
  error?: string;
}

const EditField: FC<EditFieldPropsType> = ({
  fieldLabel,
  placeholder,
  value,
  name,
  classNameInput,
  type,
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
        type={type}
        className={classNameInput}
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
